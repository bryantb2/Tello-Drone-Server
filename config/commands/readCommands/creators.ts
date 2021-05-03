import {
    ReadAcceleration,
    ReadAccelInXDirection,
    ReadAccelInYDirection, ReadAccelInZDirection, ReadAttitude, ReadBarometer, ReadBattery,
    readCommands,
    ReadFlightDistanceTime,
    ReadHeight, ReadHighestTemp, ReadLowestTemp, ReadPitch, ReadRoll, ReadSDKVersion, ReadSerialNumber,
    ReadSpeedInXDirection,
    ReadSpeedInYDirection,
    ReadSpeedInZDirection, ReadTemp, ReadTime, ReadWifi, ReadYaw
} from "./types";

export const createReadHeight = (): ReadHeight => ({
    type: readCommands.HEIGHT
})
export const createReadFlightDistanceTime = (): ReadFlightDistanceTime => ({
    type: readCommands.FLIGHT_DISTANCE_TIME
})
export const createReadSpeedInXDirection = (): ReadSpeedInXDirection => ({
    type: readCommands.SPEED_X_DIRECTION
})
export const createReadSpeedInYDirection = (): ReadSpeedInYDirection => ({
    type: readCommands.SPEED_Y_DIRECTION
})
export const createReadSpeedInZDirection = (): ReadSpeedInZDirection => ({
    type: readCommands.SPEED_Z_DIRECTION
})
export const createReadAcceleration = (): ReadAcceleration => ({
    type: readCommands.ACCELERATION
})
export const createReadAccelInXDirection = (): ReadAccelInXDirection => ({
    type: readCommands.ACCEL_X_DIRECTION
})
export const createReadAccelInYDirection = (): ReadAccelInYDirection => ({
    type: readCommands.ACCEL_Y_DIRECTION
})
export const createReadAccelInZDirection = (): ReadAccelInZDirection => ({
    type: readCommands.ACCEL_Z_DIRECTION
})
export const createReadTemp = (): ReadTemp => ({
    type: readCommands.TEMP
})
export const createReadLowestTemp = (): ReadLowestTemp => ({
    type: readCommands.LOWEST_SYS_TEMP
})
export const createReadHighestTemp = (): ReadHighestTemp => ({
    type: readCommands.HIGHEST_SYS_TEMP
})
export const createReadAttitude = (): ReadAttitude => ({
    type: readCommands.ATTITUDE
})
export const createReadPitch = (): ReadPitch => ({
    type: readCommands.PITCH
})
export const createReadRoll = (): ReadRoll => ({
    type: readCommands.ROLL
})
export const createReadYaw = (): ReadYaw => ({
    type: readCommands.YAW
})
export const createReadBarometer = (): ReadBarometer => ({
    type: readCommands.BAROMETER
})
export const createReadBattery = (): ReadBattery => ({
    type: readCommands.BATTERY
})
export const createReadTime = (): ReadTime => ({
    type: readCommands.TIME
})
export const createReadWifi = (): ReadWifi => ({
    type: readCommands.WIFI
})
export const createReadSDKVersion = (): ReadSDKVersion => ({
    type: readCommands.SDK
})
export const createReadSerialNumber = (): ReadSerialNumber => ({
    type: readCommands.SN
})
