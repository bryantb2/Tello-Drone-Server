import dgram from 'dgram';
import {
  ControlCommand,
  ReadCommand,
  SystemCommand,
} from '../../config/commands';

export interface IDroneState {
    airCharacteristics: {
        pitch: number;
        roll: number;
        yaw: number;
    },
    currentAccel: {
        y: number,
        x: number,
        z: number
    },
    currentVelocity: {
        y: number,
        x: number,
        z: number
    }
    currentPosition: {
        y: number,
        x: number,
        z: number
    },
    systems: {
        battery: {
            batteryPercent: number,
            averageBatTemp: number,
            lowestBatTemp: number,
            highestBatTemp: number,
        }
        barometer: number
        isInFlight: boolean
        currentFlightTime: number
        totalOnTime: number;
    }
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
