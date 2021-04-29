import WebSocket from 'ws';
import { connections } from "../config";
import EventEmitter from "events";
import {Command, DroneClient, DroneState} from "./types";

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
    private _stateSocket: WebSocket | null = null;
    private _videoSocket: WebSocket | null = null;
    private _commandSocket: WebSocket | null = null;

    constructor() {
        super();

        const { videoPort, commandPort, statePort } = connections
        this._videoSocket = new WebSocket(`ws://${connections.connectionIP}`, {
            port: videoPort
        })
        this._stateSocket = new WebSocket(`ws://${connections.connectionIP}`, {
            port: statePort
        })
        this._commandSocket = new WebSocket(`ws://${connections.connectionIP}`, {
            port: commandPort
        })

        this.initHandlers()
    }

    get videoSocket(): WebSocket | null {
        return this._videoSocket;
    }

    get state(): DroneState {
        return this._droneState;
    }

    private initHandlers = () => {
        this._stateSocket.on('open', socket => {
            console.log('state connection established');
        })
        this._commandSocket.on('open', socket => {
            console.log('command connection established');
        })
    }

    executeFlipMovement(cmds: Command): void {

    }

    executeLateralMovement(cmd: Command): void {
    }

    executeSetSpeed(cmd: Command): void {

    }

    executeVerticalMovement(cmds: Command[]): void {

    }
}

