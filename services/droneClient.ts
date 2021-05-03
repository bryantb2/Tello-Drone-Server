import EventEmitter from "events";
import dgram from 'dgram'
import {IDroneClient, IDroneState} from "./types";
import {connections} from "../config";
import {
    ControlCommand,
    controlCommands,
    createInitialDroneCommand,
    ReadCommand,
    readCommands,
    sysCommands,
    SystemCommand
} from "../config/commands";

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
        const [droneState, droneVideo, droneCommands] = [
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4'),
            dgram.createSocket('udp4'),
        ]
        droneState.bind(statePort, connections.connectionIP)
        droneVideo.bind(videoPort, connections.connectionIP)
        droneCommands.bind(commandPort, connections.connectionIP)

        // listening callbacks
        droneState.on('listening', function() {
            const address = droneState.address();
            console.log('UDP Server listening on ' + address.address + ':' + address.port);
        });
        droneVideo.on('listening', function() {
            const address = droneVideo.address();
            console.log('UDP Server listening on ' + address.address + ':' + address.port);
        });
        droneCommands.on('listening', function() {
            const address = droneCommands.address();
            console.log('UDP Server listening on ' + address.address + ':' + address.port);
        });

        // message callbacks
        droneState.on('message', (msg, remote) => {
            console.log('Drone state connection msg: ', msg);
        })
        // drone commands
        droneVideo.on('message', (msg, remote) => {
            console.log('Drone video connection msg: ', msg);
        });
        droneCommands.on('message', (msg, remote) => {
            console.log('Drone commands connection msg: ', msg);
        })

        // error callbacks
        droneState.on('error', (err) => {
            console.log('Error in drone state connection: ', err);
        })
        // drone commands
        droneVideo.on('error', (err) => {
            console.log('Error in drone video connection: ', err);
        });
        droneCommands.on('error', (err) => {
            console.log('Error in drone command connection: ', err);
        })

        // listening callbacks
        droneState.on('close', function() {
            const address = droneState.address();
            console.log('UDP Server closed on ' + address.address + ':' + address.port);
        });
        droneVideo.on('close', function() {
            const address = droneVideo.address();
            console.log('UDP Server closed on ' + address.address + ':' + address.port);
        });
        droneCommands.on('close', function() {
            const address = droneCommands.address();
            console.log('UDP Server closed on ' + address.address + ':' + address.port);
        });

        this._stateSocket = droneState
        this._videoSocket = droneVideo
        this._commandSocket = droneCommands

        // initialize drone
        const initializeCmd = createInitialDroneCommand()
        this.executeSystemCommand(initializeCmd)
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
        if (isValid)
            switch (cmd.type) {
                case sysCommands.WIFI:
                    this._commandSocket.send(cmd.type, this.payloadToString(cmd.payload))
                    break;
                case sysCommands.CHANGE_ACCESS_POINT:
                    this._commandSocket.send(cmd.type, this.payloadToString(cmd.payload))
                    break;
                case sysCommands.RC_CONTROLLER:
                    this._commandSocket.send(
                        this.formatCmd(
                            cmd.type,
                            this.payloadToString(cmd.payload)
                        )
                    )
                    break;
                case sysCommands.MISSION_DIRECTION:
                    this._commandSocket.send(
                        this.formatCmd(
                            cmd.type,
                            (Object.entries(cmd.payload)
                                .find(([index, isSelected]) => isSelected === true)
                            )[0] || '0'
                        )
                    )
                    break;
                default:
                    this._commandSocket.send(cmd.type)
                    break;
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
                    this._commandSocket.send(this.formatCmd(cmd.type, this.payloadToString(cmd.payload)))
                    break;
                case controlCommands.FLIP:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.direction))
                    break;
                case controlCommands.COUNTER_CLOCKWISE:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.rotationInDegrees.toString()))
                    break;
                case controlCommands.CLOCKWISE:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.rotationInDegrees.toString()))
                    break;
                case controlCommands.BACK:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.FORWARD:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.RIGHT:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.LEFT:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.DOWN:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                case controlCommands.UP:
                    this._commandSocket.send(this.formatCmd(cmd.type, cmd.payload.movementInCM.toString()))
                    break;
                default:
                    this._commandSocket.send(cmd.type)
                    break;
            }
        }
        else
            throw new Error('Invalid control command')
    }

    executeReadCommand(cmd: ReadCommand): void {
        const isValid = Object.values(readCommands).includes(cmd.type)
        if (isValid)
            this._stateSocket.send(cmd.type)
        else
            throw new Error('Invalid read command')
    }

    private formatCmd = (type: string, args: string = '') => `${type} ${args}`

    private payloadToString = (payload: Object) =>
        Object.values(payload).reduce(
            (argString: string, cmdArg: string) => cmdArg + ' ', ' '
        )
}

