export enum controlCommands {
    INITIALIZE_DRONE = 'command',
    TAKEOFF = 'takeOff',
    LAND = 'land',
    STREAM_ON = 'streamon',
    STREAM_OFF = 'streamoff',
    EMERGENCY = 'emergency',
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    FORWARD = 'forward',
    BACK = 'back',
    CLOCKWISE = 'cw',
    COUNTER_CLOCKWISE = 'ccw',
    FLIP = 'flip',
    GO = 'go',
    CURVE = 'curve'
};

export enum setCommands {
    SPEED = 'speed',
    RC = 'rc',
    WIFI = 'wifi'
};

export enum readCommands {
    SPEED = 'speed?',
    BATTERY = 'battery?',
    TIME = 'time?',
    HEIGHT = 'height?',
    TEMP = 'temp?',
    ATTITUDE = 'attitude?',
    BAROMETER = 'baro?',
    ACCELERATION = 'acceleration?',
    DISTANCE_FROM_TAKEOFF = 'tof?',
    WIFI = 'wifi?'
}
