import {BaseCommand} from "../BaseCommand";
import {MissionDirectionPayload, RCControllerPayload, WifiPayload} from "./payloads";

export enum sysCommands {
    INITIALIZE_DRONE = 'command',
    STREAM_ON = 'streamon',
    STREAM_OFF = 'streamoff',
    EMERGENCY = 'emergency',
    RC_CONTROLLER = 'rc',
    WIFI = 'wifi',
    MISSION_ON = 'mon',
    MISSION_OFF = 'moff',
    MISSION_DIRECTION = 'mdirection',
    CHANGE_ACCESS_POINT = 'ap'
}

export type InitialDroneCommand = BaseCommand<sysCommands.INITIALIZE_DRONE>
export type StreamOnCommand = BaseCommand<sysCommands.STREAM_ON>
export type StreamOffCommand = BaseCommand<sysCommands.STREAM_OFF>
export type EmergencyCommand = BaseCommand<sysCommands.EMERGENCY>
export type RCControllerCommand = BaseCommand<sysCommands.RC_CONTROLLER, RCControllerPayload>
export type WifiCommand = BaseCommand<sysCommands.WIFI, WifiPayload>
export type MissionOnCommand = BaseCommand<sysCommands.MISSION_ON>
export type MissionOffCommand = BaseCommand<sysCommands.MISSION_OFF>
export type MissionDirectionCommand = BaseCommand<sysCommands.MISSION_DIRECTION, MissionDirectionPayload>
export type ChangeAccessPointCommand = BaseCommand<sysCommands.CHANGE_ACCESS_POINT, WifiPayload>

export type SystemCommand =
    InitialDroneCommand | StreamOnCommand | StreamOffCommand
    | EmergencyCommand | RCControllerCommand | WifiCommand
    | MissionOnCommand | MissionOffCommand | MissionDirectionCommand
    | ChangeAccessPointCommand
