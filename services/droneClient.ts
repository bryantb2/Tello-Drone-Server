import EventEmitter from "events";
import dgram from 'dgram'
import {IDroneClient, IDroneState} from "./types";
import {connections, createReadBarometer, createReadBattery, createTakeoffCommand} from "../config";
import {
    ControlCommand,
    controlCommands,
    createInitialDroneCommand,
    ReadCommand,
    readCommands,
    sysCommands,
    SystemCommand
} from "../config/commands";
import { throttle } from 'lodash'
import {AddressInfo} from "net";

interface ISocketSetup {
    channel: string,
    socket: dgram.Socket,
    msgCallback: (msg: Buffer) => void
}

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

    constructor() {
        super();

        const { videoPort, commandPort, statePort } = connections

        // UDP connection
        const [stateSocket, videoSocket, commandSocket] = [
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4'),
        ]

        commandSocket.bind(commandPort)
        stateSocket.bind(statePort)
        videoSocket.bind(videoPort)

        // send SDK command here??
        this.setupBasicListeners([
            {
                channel: 'State',
                socket: stateSocket,
                msgCallback: throttle((msg) => {
                    // parse state

                    this.logConnectionMessage('State', msg.toString())
                })
            },
            {
                channel: 'Command',
                socket: commandSocket,
                msgCallback: (msg) => {
                    this.logConnectionMessage('Command', msg.toString())
                }
            },
            {
                channel: 'Video',
                socket: videoSocket,
                msgCallback: (msg) => {
                    this.logConnectionMessage('Video', msg.toString())
                }
            }
        ])

        this._stateSocket = stateSocket
        this._videoSocket = videoSocket
        this._commandSocket = commandSocket

        // intialize drone
        this.initializeDrone()
    }

    private initializeDrone = () => {
       this.executeSystemCommand(createInitialDroneCommand())
       this.executeReadCommand(createReadBattery())
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
        console.log('System command executing: ', cmd)
        const { commandPort } = connections
        const isValid = Object.values(sysCommands).includes(cmd.type)
        if (isValid) {
            switch (cmd.type) {
                case sysCommands.WIFI:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, this.payloadToString(cmd.payload)), commandPort)
                    break;
                case sysCommands.CHANGE_ACCESS_POINT:
                    this.sendToSocket(
                        this._commandSocket,
                        this.formatCmd(cmd.type, this.payloadToString(cmd.payload)),
                        commandPort
                    )
                    break;
                case sysCommands.RC_CONTROLLER:
                    this.sendToSocket(
                        this._commandSocket,
                        this.formatCmd(
                            cmd.type,
                            this.payloadToString(cmd.payload)
                        ), commandPort
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
                        ), commandPort
                    )
                    break;
                default:
                    this.sendToSocket(this._commandSocket, cmd.type, commandPort)
                    break;
            }
            //console.log(`${cmd.type} System Command fired, with payload of: `, cmd.payload)
        }
        else
            throw new Error('Invalid system command')
    }

    executeControlCommand(cmd: ControlCommand): void {
        const { commandPort } = connections
        const isValid = Object.values(controlCommands).includes(cmd.type)
        if (isValid) {
            switch (cmd.type) {
                case controlCommands.TAKEOFF:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, this.payloadToString(cmd.payload)), commandPort)
                    break;
                case controlCommands.CURVE:
                    break;
                case controlCommands.GO:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, this.payloadToString(cmd.payload)), commandPort)
                    break;
                case controlCommands.FLIP:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.direction), commandPort)
                    break;
                case controlCommands.COUNTER_CLOCKWISE:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.rotationInDegrees.toString()), commandPort)
                    break;
                case controlCommands.CLOCKWISE:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.rotationInDegrees.toString()), commandPort)
                    break;
                case controlCommands.BACK:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()), commandPort)
                    break;
                case controlCommands.FORWARD:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()), commandPort)
                    break;
                case controlCommands.RIGHT:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()), commandPort)
                    break;
                case controlCommands.LEFT:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()), commandPort)
                    break;
                case controlCommands.DOWN:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()), commandPort)
                    break;
                case controlCommands.UP:
                    this.sendToSocket(this._commandSocket, this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()), commandPort)
                    break;
                default:
                    this.sendToSocket(this._commandSocket, cmd.type, commandPort)
                    break;
            }
            //console.log(`${cmd.type} Control Command fired, with payload of: `, cmd.payload)
        }
        else
            throw new Error('Invalid control command')
    }

    executeReadCommand(cmd: ReadCommand): void {
        console.log('Read command executing: ', cmd)
        const isValid = Object.values(readCommands).includes(cmd.type)
        if (isValid) {
            this.sendToSocket(this._stateSocket, cmd.type, connections.commandPort)
        }
        else
            throw new Error('Invalid read command')
    }

    // senders
    private sendToSocket = (socket: dgram.Socket, cmd: string, port: number) => {
        //const address = socket.address()
        console.log('Sending command: ', cmd)
        socket.send(
            cmd,
            0,
            cmd.length,
            port,
            connections.connectionIP,
            err => {
            if (err) console.log('error sending command: ', err)
        })
    }

    // callback setup
    private setupBasicListeners = (sockets: ISocketSetup[]): void => {
        for (const { channel, socket, msgCallback } of sockets) {
            // initial listener
            socket.on('listening', () => {
                // instantiate remaining handlers
                const address = socket.address()
                this.logConnectionListen(address, channel)
            });
            socket.on('message', msgCallback)
            socket.on('error', (err) => {
                console.log(`Error in "${channel}" channel: `, err);
            });
            socket.on('close', () => {
                const address = socket.address()
                this.logConnectionClosed(address, channel)
            });
        }
    }

    // formatters
    private formatCmd = (type: string, args: string = '') => `${type} ${args}`
    private payloadToString = (payload: Object) =>
        Object.values(payload).reduce(
            (argString: string, cmdArg: string) => cmdArg + ' ', ' '
        )
    private formatAddress = (address: AddressInfo): string => address.address + ':' + address.port

    // loggers
    private logConnectionMessage = (channel: string, msg: string) => {
        console.log(`Message received in "${channel}" channel: `, msg);
    }
    private logConnectionListen = (address: AddressInfo, channel: string) => {
        console.log(`'UDP Server listening on ${this.formatAddress(address)} (${channel})`);
    }
    private logConnectionClosed = (address: AddressInfo, channel: string) => {
        console.log(`'UDP Server closed on ${this.formatAddress(address)} (${channel})`);
    }

    // parsers
    private calculateAndUpdateState = (rawState: any): void => {
        const {
            pitch,
            roll,
            yaw,
            vgx,
            vgy,
            vgz,
            templ,
            temph,
            tof,
            h,
            bat,
            baro,
            time,
            agx,
            agy,
            agz
        } = rawState

        const newState: IDroneState = {
            ...this.state,
            airCharacteristics: {
                pitch,
                yaw,
                roll
            },
            isInFlight: (h as number) > 0,
            batteryPercent: bat as number,
            currentFlightTime: time,
            speed: 0, //todo: cal this in real time,
            currentAccel: {
                yAccel: agy,
                xAccel: agx,
                zAccel: agz
            },
            currentVelocity: {
                yVel: vgy,
                xVel: vgx,
                zVel: vgz
            },
            acceleration: 0, //todo: cal this in real time,
            altitude: h as number,
            batteryTemp: ((templ as number) + (temph as  number)) / 2,
        }
        this._droneState = newState
    }
}

