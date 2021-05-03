import dgram from "dgram";
import {
    ControlCommand,
    ReadCommand,
    SystemCommand
} from "../../config/commands";

export interface IDroneState {
    isInFlight: boolean
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

export interface IDroneClient {
    closeClient: () => void
    executeSystemCommand: (cmd: SystemCommand) => void,
    executeControlCommand: (cmd: ControlCommand) => void,
    executeReadCommand: (cmd: ReadCommand) => void
    state: IDroneState,
    videoSocket: dgram.Socket | null
    controlSocket: dgram.Socket | null
    readSocket: dgram.Socket | null
}

