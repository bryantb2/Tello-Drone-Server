import {controlCommands, readCommands, setCommands} from "../../config";

export interface Command {
    type: keyof controlCommands & keyof setCommands & keyof  readCommands,
    payload: any
}

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
    executeLateralMovement: (cmd: Command) => void,
    executeVerticalMovement: (cmds: Command[]) => void
    executeFlipMovement: (cmds: Command) => void
    executeSetSpeed: (cmd: Command) => void,
    state: DroneState,
    videoSocket: WebSocket | null
}

