import { readCommands } from ".";
import { ICustomOption } from "../../cli/types";

export type ReadOptions = ICustomOption<readCommands>[];
export const readOptions: ReadOptions = [
  {
    abrv: "-h",
    normalized: "--height?",
    desc: "Get the current height in CM",
    type: readCommands.HEIGHT,
  },
  {
    abrv: "-tof",
    normalized: "--timeOfFlight?",
    desc: "Get the current flight time in travel",
    type: readCommands.FLIGHT_DISTANCE_TIME,
  },
  {
    abrv: "-s",
    normalized: "--speed?",
    desc: "Get current flight velocity in CM/s",
    type: readCommands.SPEED,
  },
  {
    abrv: "-sx",
    normalized: "--speedX?",
    desc: "Get current flight velocity, in x direction, in CM/s",
    type: readCommands.SPEED_X_DIRECTION,
  },
  {
    abrv: "-sy",
    normalized: "--speedY?",
    desc: "Get current flight velocity, in y direction, in CM/s",
    type: readCommands.SPEED_Y_DIRECTION,
  },
  {
    abrv: "-sz",
    normalized: "--speedZ?",
    desc: "Get current flight velocity, in z direction, in CM/s",
    type: readCommands.SPEED_Z_DIRECTION,
  },
  {
    abrv: "-a",
    normalized: "--accel?",
    desc: "Get current acceleration in CM/s^2",
    type: readCommands.ACCELERATION,
  },
  {
    abrv: "-tmp",
    normalized: "--temp?",
    desc: "Get current drone temperature in degrees C",
    type: readCommands.TEMP,
  },
  {
    abrv: "-att",
    normalized: "--attitude?",
    desc: "Get degree offset of aircraft in relation to horizon",
    type: readCommands.ATTITUDE,
  },
  {
    abrv: "-pit",
    normalized: "--pitch?",
    desc: "Get the aircraft's degree offset on z axis",
    type: readCommands.PITCH,
  },
  {
    abrv: "-rl",
    normalized: "--roll?",
    desc: "Get the aircraft's degree offset on x axis",
    type: readCommands.ROLL,
  },
  {
    abrv: "-br",
    normalized: "--baro?",
    desc: "Get atmospheric pressure in CM",
    type: readCommands.BAROMETER,
  },
  {
    abrv: "-btry",
    normalized: "--battery?",
    desc: "Get percent of battery remaining",
    type: readCommands.BATTERY,
  },
  {
    abrv: "-time",
    normalized: "--time?",
    desc: "Get total flight time",
    type: readCommands.TIME,
  },
  {
    abrv: "-wifi",
    normalized: "--wifi?",
    desc: "Get wifi SNR",
    type: readCommands.WIFI,
  },
  {
    abrv: "-sdk",
    normalized: "--sdk?",
    desc: "Enter drone into development mode",
    type: readCommands.SDK,
  },
  {
    abrv: "-sn",
    normalized: "--serialNum?",
    desc: "Get drone serial number",
    type: readCommands.SN,
  },
];
