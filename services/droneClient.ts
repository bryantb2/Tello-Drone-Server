import EventEmitter from "events";
import dgram from 'dgram'
import {IDroneClient, IDroneState} from "./types";
import {connections, createReadBarometer, createReadBattery} from "../config";
import {
    ControlCommand,
    controlCommands,
    createInitialDroneCommand,
    ReadCommand,
    readCommands,
    sysCommands,
    SystemCommand
} from "../config/commands";
import {AddressInfo} from "net";

export class DroneService extends EventEmitter implements IDroneClient {
    // fields
    private _droneState: IDroneState = {
        isInFlight: false,
        batteryPercent: 0,
        currentFlightTime: 0,
        speed: 0,
        currentPosition: {
            xOffSet: 0,
            yOffSet: 0,
            zOffSet: 0
        },
        acceleration: 0,
        altitude: 0,
        batteryTemp: 0
    };
    private _stateSocket: dgram.Socket | null = null;
    private _videoSocket: dgram.Socket | null = null;
    private _commandSocket: dgram.Socket | null = null;
    private _responseSocket: dgram.Socket | null = null;

    constructor() {
        super();

        const { videoPort, commandPort, statePort, responsePort } = connections

        // UDP connection
        const [droneState, droneVideo, droneCommands, droneResponse] = [
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4')
        ]

        droneState.bind(statePort)
        droneVideo.bind(videoPort)
        droneCommands.bind(commandPort)
        droneResponse.bind(responsePort)

        this.setupBasicListeners([droneState, droneVideo, droneCommands, droneResponse])

        this._stateSocket = droneState
        this._videoSocket = droneVideo
        this._commandSocket = droneCommands
        this._responseSocket = droneResponse

        setTimeout(() => {
            this.executeSystemCommand(createInitialDroneCommand())
            setTimeout(() => {
                this.executeReadCommand(createReadBarometer())
                this.executeReadCommand(createReadBattery())
            }, 10000)
        }, 9000)
    }

    closeClient = () => {
        this._videoSocket.close()
        this._stateSocket.close()
        this._commandSocket.close()
        this._videoSocket = null
        this._stateSocket = null
        this._commandSocket = null
    }

    // properties
    get videoSocket(): dgram.Socket {
        return this._videoSocket;
    }

    get controlSocket(): dgram.Socket {
        return this._commandSocket;
    }

    get readSocket(): dgram.Socket {
        return this._stateSocket;
    }

    get state(): IDroneState {
        return this._droneState;
    }

    // methods
    /**
     * Executes a command from the System Commands enumerable. Returns error if the command type is not o System Command
     */
    executeSystemCommand = (cmd: SystemCommand): void => {
        const isValid = Object.values(sysCommands).includes(cmd.type)
        if (isValid) {
            switch (cmd.type) {
                case sysCommands.WIFI:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, this.payloadToString(cmd.payload)))
                    break;
                case sysCommands.CHANGE_ACCESS_POINT:
                    this.sendToSocket(
                        this._commandSocket,
                        this.formatCmd(cmd.type, this.payloadToString(cmd.payload))
                    )
                    break;
                case sysCommands.RC_CONTROLLER:
                    this.sendToSocket(
                        this._commandSocket,
                        this.formatCmd(
                            cmd.type,
                            this.payloadToString(cmd.payload)
                        )
                    )
                    break;
                case sysCommands.MISSION_DIRECTION:
                    this.sendToSocket(
                        this._commandSocket,
                        this.formatCmd(
                            cmd.type,
                            (Object.entries(cmd.payload)
                                    .find(([index, isSelected]) => isSelected === true)
                            )[0] || '0'
                        )
                    )
                    break;
                default:
                    this.sendToSocket(this._commandSocket, cmd.type)
                    break;
            }
            console.log(`${cmd.type} System Command fired, with payload of: `, cmd.payload)
        }
        else
            throw new Error('Invalid system command')
    }

    executeControlCommand(cmd: ControlCommand): void {
        const isValid = Object.values(controlCommands).includes(cmd.type)
        if (isValid) {
            switch (cmd.type) {
                case controlCommands.CURVE:
                    break;
                case controlCommands.GO:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, this.payloadToString(cmd.payload)))
                    break;
                case controlCommands.FLIP:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.direction))
                    break;
                case controlCommands.COUNTER_CLOCKWISE:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.rotationInDegrees.toString()))
                    break;
                case controlCommands.CLOCKWISE:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.rotationInDegrees.toString()))
                    break;
                case controlCommands.BACK:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.FORWARD:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.RIGHT:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.LEFT:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.DOWN:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.UP:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                default:
                    this.sendToSocket(this._commandSocket, cmd.type)
                    break;
            }
            console.log(`${cmd.type} Control Command fired, with payload of: `, cmd.payload)
        }
        else
            throw new Error('Invalid control command')
    }

    executeReadCommand(cmd: ReadCommand): void {
        const isValid = Object.values(readCommands).includes(cmd.type)
        if (isValid) {
            console.log(`${cmd.type} Read Command fired, with payload of: `, cmd.payload)
            this.sendToSocket(this._stateSocket, cmd.type)
        }
        else
            throw new Error('Invalid read command')
    }

    // senders
    private sendToSocket = (socket: dgram.Socket, cmd: string) => {
        console.log('Send to Socket Fired', socket.address())
        socket.send(
            cmd,
            0,
            cmd.length,
            socket.address().port,
            connections.connectionIP,
            err => {
            if (err) console.log('error sending command: ', err)
        })
    }

    // formatters
    private formatCmd = (type: string, args: string = '') => `${type} ${args}`
    private payloadToString = (payload: Object) =>
        Object.values(payload).reduce(
            (argString: string, cmdArg: string) => cmdArg + ' ', ' '
        )
    private formatAddress = (address: AddressInfo): string => address.address + ':' + address.port

    // callback setup
    private setupBasicListeners = (sockets: dgram.Socket[]): void => {
        for (const socket of sockets) {
            // initial listener
            socket.on('listening', () => {
                // instantiate remaining handlers
                const address = socket.address()
                this.logConnectionListen(address)

                socket.on('message', (msg, remote) => {
                    const response = msg.toString()
                    this.logConnectionMessage(
                        this.formatAddress(address),
                        response
                    )
                })
                socket.on('error', (err) => {
                    console.log(`Error in ${this.formatAddress(address)} connection: `, err);
                });
                socket.on('close', () => {
                    this.logConnectionClosed(address)
                });
            });
        }
    }

    // loggers
    private logConnectionMessage = (channel: string, msg: string) => {
        console.log(`Drone ${channel} connection msg: `, msg);
    }
    private logConnectionListen = (address: AddressInfo) => {
        console.log('UDP Server listening on ' + this.formatAddress(address));
    }
    private logConnectionClosed = (address: AddressInfo) => {
        console.log('UDP Server closed on ' + this.formatAddress(address));
    }
}

