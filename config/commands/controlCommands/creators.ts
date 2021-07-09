import {
  BackPayload, CurvePayload,
  DownPayload, FlipPayload,
  ForwardPayload, GoPayload,
  LeftPayload,
  RightPayload, RotateLeftPayload,
  RotateRightPayload,
  UpPayload
} from "./payloads";
import {
  controlCommands,
  BackCommand, CurveCommand,
  DownCommand, FlipCommand, ForwardCommand, GoCommand,
  LandCommand,
  LeftCommand, RightCommand, RotateLeftCommand,
  RotateRightCommand,
  SpeedCommand,
  StopCommand,
  TakeOffCommand,
  UpCommand
} from "./types";

// action creators
export const createSpeedCommand = (): SpeedCommand => ({
  type: controlCommands.SPEED
});
export const createLandCommand = (): LandCommand => ({
  type: controlCommands.LAND
});
export const createTakeoffCommand = (): TakeOffCommand => ({
  type: controlCommands.TAKEOFF
});
export const createStopCommand = (): StopCommand => ({
  type: controlCommands.STOP
});
export const createUpCommand = (payload: UpPayload): UpCommand => ({
  type: controlCommands.UP, payload
});
export const createDownCommand = (payload: DownPayload): DownCommand => ({
  type: controlCommands.DOWN, payload
});
export const createLeftCommand = (payload: LeftPayload): LeftCommand => ({
  type: controlCommands.LEFT, payload
});
export const createRightCommand = (payload: RightPayload): RightCommand => ({
  type: controlCommands.RIGHT, payload
});
export const createForwardCommand = (payload: ForwardPayload): ForwardCommand => ({
  type: controlCommands.FORWARD, payload
});
export const createBackCommand = (payload: BackPayload): BackCommand => ({
  type: controlCommands.BACK, payload
});
export const createRotateRightCommand = (payload: RotateRightPayload): RotateRightCommand => ({
  type: controlCommands.CLOCKWISE, payload
});
export const createRotateLeftCommand = (payload: RotateLeftPayload): RotateLeftCommand => ({
  type: controlCommands.COUNTER_CLOCKWISE, payload
});
export const createFlipCommand = (payload: FlipPayload): FlipCommand => ({
  type: controlCommands.FLIP, payload
});
export const createGoCommand = (payload: GoPayload): GoCommand => ({
  type: controlCommands.GO, payload
});
export const createCurveCommand = (payload: CurvePayload): CurveCommand => ({
  type: controlCommands.CURVE, payload
});
