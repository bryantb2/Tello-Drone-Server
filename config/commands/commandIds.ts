

export enum sysCommands {
    INITIALIZE_DRONE = 'Command',
    STREAM_ON = 'streamon',
    STREAM_OFF = 'streamoff',
    EMERGENCY = 'emergency',
    RC_CONTROLLER = 'rc',
    WIFI = 'wifi'
}

export enum readCommands {
    // position
    HEIGHT = 'height?',
    FLIGHT_DISTANCE_TIME = 'tof?',
    // speed
    SPEED = 'speed?',
    SPEED_X_DIRECTION='',
    SPEED_Y_DIRECTION='',
    SPEED_Z_DIRECTION='',
    // accel
    ACCELERATION = 'acceleration?',
    ACCEL_X_DIRECTION='',
    ACCEL_Y_DIRECTION='',
    ACCEL_Z_DIRECTION='',
    // system
    TEMP='',
    LOWEST_SYS_TEMP='',
    HIGHEST_SYS_TEMP='',
    // attitude
    ATTITUDE = 'attitude?',
    PITCH = 'pitch?',
    ROLL = 'roll?',
    YAW='',
    // system
    BAROMETER = 'baro?',
    BATTERY = 'battery?',
    TIME = 'time?',
    WIFI = 'wifi?',
    SDK = 'sdk?',
    SN = 'sn?'
}
