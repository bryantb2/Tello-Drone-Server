import {
    ChangeAccessPointCommand,
    EmergencyCommand,
    InitialDroneCommand,
    MissionDirectionCommand,
    MissionOffCommand,
    MissionOnCommand,
    RCControllerCommand,
    StreamOffCommand,
    StreamOnCommand,
    sysCommands,
    WifiCommand
} from "./types";
import {
    MissionDirectionPayload,
    RCControllerPayload,
    WifiPayload
} from "./payloads";

export const createInitialDroneCommand = (): InitialDroneCommand => ({
    type: sysCommands.INITIALIZE_DRONE
})
export const createStreamOnCommand = (): StreamOnCommand => ({
    type: sysCommands.STREAM_ON
})
export const createStreamOffCommand = (): StreamOffCommand => ({
    type: sysCommands.STREAM_OFF
})
export const createEmergencyCommand = (): EmergencyCommand => ({
    type: sysCommands.EMERGENCY
})
export const createRCControllerCommand = (payload: RCControllerPayload): RCControllerCommand => ({
    type: sysCommands.RC_CONTROLLER,
    payload
})
export const createWifiCommand = (payload: WifiPayload): WifiCommand => ({
    type: sysCommands.WIFI,
    payload
})
export const createMissionOnCommand = (): MissionOnCommand => ({
    type: sysCommands.MISSION_ON
})
export const createMissionOffCommand = (): MissionOffCommand => ({
    type: sysCommands.MISSION_OFF
})
export const createMissionDirectionCommand = (payload: MissionDirectionPayload): MissionDirectionCommand => ({
    type: sysCommands.MISSION_DIRECTION,
    payload
})
export const createChangeAccessPointCommand = (payload: WifiPayload): ChangeAccessPointCommand => ({
    type: sysCommands.CHANGE_ACCESS_POINT,
    payload
})
