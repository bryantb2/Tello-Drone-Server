import { BaseCommand } from "../BaseCommand";

export enum readCommands {
  // position
  HEIGHT = "height?",
  FLIGHT_DISTANCE_TIME = "tof?",
  // speed
  SPEED = "speed?",
  SPEED_X_DIRECTION = "",
  SPEED_Y_DIRECTION = "",
  SPEED_Z_DIRECTION = "",
  // accel
  ACCELERATION = "acceleration?",
  ACCEL_X_DIRECTION = "",
  ACCEL_Y_DIRECTION = "",
  ACCEL_Z_DIRECTION = "",
  // system
  TEMP = "",
  LOWEST_SYS_TEMP = "",
  HIGHEST_SYS_TEMP = "",
  // attitude
  ATTITUDE = "attitude?",
  PITCH = "pitch?",
  ROLL = "roll?",
  YAW = "",
  // system
  BAROMETER = "baro?",
  BATTERY = "battery?",
  TIME = "time?",
  WIFI = "wifi?",
  SDK = "sdk?",
  SN = "sn?",
}

export type ReadHeight = BaseCommand<readCommands.HEIGHT>;
export type ReadFlightDistanceTime =
  BaseCommand<readCommands.FLIGHT_DISTANCE_TIME>;
export type ReadSpeedInXDirection = BaseCommand<readCommands.SPEED_X_DIRECTION>;
export type ReadSpeedInYDirection = BaseCommand<readCommands.SPEED_Y_DIRECTION>;
export type ReadSpeedInZDirection = BaseCommand<readCommands.SPEED_Z_DIRECTION>;
export type ReadAcceleration = BaseCommand<readCommands.ACCELERATION>;
export type ReadAccelInXDirection = BaseCommand<readCommands.ACCEL_X_DIRECTION>;
export type ReadAccelInYDirection = BaseCommand<readCommands.ACCEL_Y_DIRECTION>;
export type ReadAccelInZDirection = BaseCommand<readCommands.ACCEL_Z_DIRECTION>;
export type ReadTemp = BaseCommand<readCommands.TEMP>;
export type ReadLowestTemp = BaseCommand<readCommands.LOWEST_SYS_TEMP>;
export type ReadHighestTemp = BaseCommand<readCommands.HIGHEST_SYS_TEMP>;
export type ReadAttitude = BaseCommand<readCommands.ATTITUDE>;
export type ReadPitch = BaseCommand<readCommands.PITCH>;
export type ReadRoll = BaseCommand<readCommands.ROLL>;
export type ReadYaw = BaseCommand<readCommands.YAW>;
export type ReadBarometer = BaseCommand<readCommands.BAROMETER>;
export type ReadBattery = BaseCommand<readCommands.BATTERY>;
export type ReadTime = BaseCommand<readCommands.TIME>;
export type ReadWifi = BaseCommand<readCommands.WIFI>;
export type ReadSDKVersion = BaseCommand<readCommands.SDK>;
export type ReadSerialNumber = BaseCommand<readCommands.SN>;

export type ReadCommand =
  | ReadHeight
  | ReadFlightDistanceTime
  | ReadSpeedInXDirection
  | ReadSpeedInYDirection
  | ReadSpeedInZDirection
  | ReadAcceleration
  | ReadAccelInXDirection
  | ReadAccelInYDirection
  | ReadAccelInZDirection
  | ReadTemp
  | ReadLowestTemp
  | ReadHighestTemp
  | ReadAttitude
  | ReadPitch
  | ReadRoll
  | ReadYaw
  | ReadBarometer
  | ReadBattery
  | ReadTime
  | ReadWifi
  | ReadSDKVersion
  | ReadSerialNumber;
