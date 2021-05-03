import {BaseCommand} from "../BaseCommand";
import {
    BackPayload, CurvePayload,
    DownPayload, FlipPayload,
    ForwardPayload, GoPayload,
    LeftPayload,
    RightPayload, RotateLeftPayload,
    RotateRightPayload,
    UpPayload
} from "./payloads";

export enum controlCommands {
    // directional
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    FORWARD = 'forward',
    BACK = 'back',
    // rotation
    CLOCKWISE = 'cw',
    COUNTER_CLOCKWISE = 'ccw',
    // movement
    STOP = 'stop',
    TAKEOFF = 'takeOff',
    LAND = 'land',
    SPEED = 'speed',
    // advanced movement
    FLIP = 'flip',
    GO = 'go',
    CURVE = 'curve',
};

export type SpeedCommand = BaseCommand<controlCommands.SPEED>
export type LandCommand = BaseCommand<controlCommands.LAND>
export type TakeOffCommand = BaseCommand<controlCommands.TAKEOFF>
export type StopCommand = BaseCommand<controlCommands.STOP>
export type UpCommand = BaseCommand<controlCommands.UP, UpPayload>
export type DownCommand = BaseCommand<controlCommands.DOWN, DownPayload>
export type LeftCommand = BaseCommand<controlCommands.LEFT, LeftPayload>
export type RightCommand = BaseCommand<controlCommands.RIGHT, RightPayload>
export type ForwardCommand = BaseCommand<controlCommands.FORWARD, ForwardPayload>
export type BackCommand = BaseCommand<controlCommands.BACK, BackPayload>
export type RotateRightCommand =  BaseCommand<controlCommands.CLOCKWISE, RotateRightPayload>
export type RotateLeftCommand = BaseCommand<controlCommands.COUNTER_CLOCKWISE, RotateLeftPayload>
export type FlipCommand = BaseCommand<controlCommands.FLIP, FlipPayload>
export type GoCommand = BaseCommand<controlCommands.GO, GoPayload>
export type CurveCommand = BaseCommand<controlCommands.CURVE, CurvePayload>

export type ControlCommand =
    SpeedCommand | LandCommand | TakeOffCommand | StopCommand
    | UpCommand | DownCommand | LeftCommand | RightCommand | ForwardCommand
    | BackCommand | RotateRightCommand | RotateLeftCommand | FlipCommand
    | GoCommand | CurveCommand

