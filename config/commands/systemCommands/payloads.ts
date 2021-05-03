export interface RCControllerPayload {
    leftRightChannel: number;
    forwardBackwardChannel: number;
    upDownChannel: number;
    yawChannel: number;
}

export interface WifiPayload {
    ssid: string;
    pass: string;
}

export interface MissionDirectionPayload {
    0: boolean;
    1: boolean;
    2: boolean;
}
