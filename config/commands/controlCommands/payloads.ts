export interface UpPayload {
    movementInCM: number
}

export interface DownPayload {
    movementInCM: number
}

export interface LeftPayload {
    movementInCM: number
}

export interface RightPayload {
    movementInCM: number
}

export interface ForwardPayload {
    movementInCM: number
}

export interface BackPayload {
    movementInCM: number
}

export interface RotateRightPayload {
    rotationInDegrees: number
}

export interface RotateLeftPayload {
    rotationInDegrees: number
}

export interface FlipPayload {
    direction: 'l' | 'r' | 'f' | 'b'
}

export interface GoPayload {
    flyToX: number;
    flyToY: number;
    flyToZ: number;
    speed: number;
}

export interface CurvePayload {
    startFromX: number;
    startFromY: number;
    startFromZ: number;
    flyToX: number;
    flyToY: number;
    flyToZ: number;
    speed: number;
}

