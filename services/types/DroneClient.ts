import {movementCommands, readCommands, setCommands, sysCommands} from "../../config";
import WebSocket from "ws";
import dgram from "dgram";

export interface DroneState {
    batteryPercent: number
    currentFlightTime: number
    speed: number
    currentPosition: {
        xOffSet: number,
        yOffSet: number,
        zOffSet: number
    },
    acceleration: number,
    altitude: number;
    batteryTemp: number,
}

export interface DroneClient {
    closeClient: () => void
    executeSystemCommand: (cmd: Command) => void,
    executeRotationMovement: (cmd: Command) => void,
    executeHorizontalMovement: (cmd: Command) => void,
    executeVerticalMovement: (cmds: Command[]) => void,
    executeFlipMovement: (cmds: Command) => void,
    executeSetSpeed: (cmd: Command) => void,
    state: DroneState,
    videoSocket: dgram.Socket | null
}

