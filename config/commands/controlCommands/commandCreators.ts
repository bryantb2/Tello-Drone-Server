import {controlCommands} from "./commandTypes";
import {
    BackPayload, CurvePayload,
    DownPayload, FlipPayload,
    ForwardPayload, GoPayload,
    LeftPayload,
    RightPayload, RotateLeftPayload,
    RotateRightPayload,
    UpPayload
} from "./commandPayloads";
import {BaseCommand} from "../BaseCommand";

export const createSpeedCommand = (): BaseCommand<controlCommands.SPEED> => ({
    type: controlCommands.SPEED
})

export const createLandCommand = (): BaseCommand<controlCommands.LAND> => ({
    type: controlCommands.LAND
})

export const createTakeoffCommand = (): BaseCommand<controlCommands.TAKEOFF> => ({
    type: controlCommands.TAKEOFF
})

export const createStopCommand = (): BaseCommand<controlCommands.STOP> => ({
    type: controlCommands.STOP
})

export const createUpCommand = (payload: UpPayload): BaseCommand<controlCommands.UP, UpPayload> => ({
    type: controlCommands.UP, payload
})

export const createDownCommand = (payload: DownPayload): BaseCommand<controlCommands.DOWN, DownPayload> => ({
    type: controlCommands.DOWN, payload
})

export const createLeftCommand= (payload: LeftPayload): BaseCommand<controlCommands.LEFT, LeftPayload> => ({
    type: controlCommands.LEFT, payload
})

export const createRightCommand = (payload: RightPayload): BaseCommand<controlCommands.RIGHT, RightPayload> => ({
    type: controlCommands.RIGHT, payload
})

export const createForwardCommand = (payload: ForwardPayload): BaseCommand<controlCommands.FORWARD, ForwardPayload> => ({
    type: controlCommands.FORWARD, payload
})

export const createBackCommand = (payload: BackPayload): BaseCommand<controlCommands.BACK, BackPayload> => ({
    type: controlCommands.BACK, payload
})

export const createRotateRightCommand = (payload: RotateRightPayload): BaseCommand<controlCommands.CLOCKWISE, RotateRightPayload> => ({
    type: controlCommands.CLOCKWISE, payload
})

export const createRotateLeftCommand = (payload: RotateLeftPayload): BaseCommand<controlCommands.COUNTER_CLOCKWISE, RotateLeftPayload> => ({
    type: controlCommands.COUNTER_CLOCKWISE, payload
})

export const createFlipCommand = (payload: FlipPayload): BaseCommand<controlCommands.FLIP, FlipPayload> => ({
    type: controlCommands.FLIP, payload
})

export const createGoCommand = (payload: GoPayload): BaseCommand<controlCommands.GO, GoPayload> => ({
    type: controlCommands.GO, payload
})

export const createCurveCommand = (payload: CurvePayload): BaseCommand<controlCommands.CURVE, CurvePayload> => ({
    type: controlCommands.CURVE, payload
})
