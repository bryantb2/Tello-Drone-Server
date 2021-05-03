import {connections, movementCommands, readCommands, sysCommands} from "../config";
import EventEmitter from "events";
import dgram from 'dgram'
import {Command, DroneClient, DroneState} from "./types";
import {DEFAULT_ENCODING} from "crypto";

export class SocketService extends EventEmitter implements DroneClient {
    // fields
    private _droneState: DroneState = {
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
        this.executeSystemCommand({
            type: movementCommands.INITIALIZE_DRONE
        })
    }

    executeRotationMovement = (cmd: Command): void => {

    };

    executeHorizontalMovement = (cmd: Command): void => {

    };

    closeClient = () => {
        this._videoSocket.close()
        this._stateSocket.close()
        this._commandSocket.close()
        this._videoSocket = null
        this._stateSocket = null
        this._commandSocket = null
    }

    get videoSocket(): dgram.Socket {
        return this._videoSocket;
    }

    get state(): DroneState {
        return this._droneState;
    }

    /**
     * Executes a command from the System Commands enumerable. Returns error if the command type is not o System Command
     */
    executeSystemCommand = (cmd: Command): void => {
        const isValid = Object.values(sysCommands).includes(cmd.type as sysCommands)
        if (isValid)
            this._commandSocket.send(cmd.type)
        else
            throw new Error('Invalid system command')
    }

    executeFlipMovement = (cmds: Command): void => {
        throw new Error('Execute flip not implemented ')
    }

    executeLateralMovement = (cmd: Command): void => {
        throw new Error('Execute lateral movement not implemented ')
    }

    executeSetSpeed = (cmd: Command): void => {
        throw new Error('Execute set speed not implemented ')
    }

    executeVerticalMovement = (cmds: Command[]): void => {

    }
}

