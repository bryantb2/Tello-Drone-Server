import { controlCommands } from ".";
import { ICustomOption } from "../../cli/types";

export const controlOptions: ICustomOption<controlCommands>[] = [
  {
    abrv: "-up",
    normalized: "--up <string>",
    desc: "Move up a specified distance in CM",
    type: controlCommands.UP,
  },
  {
    abrv: "-dn",
    normalized: "--down <string>",
    desc: "Move down a specified distance in CM",
    type: controlCommands.DOWN,
  },
  {
    abrv: "-lf",
    normalized: "--left <string>",
    desc: "Move left a specified distance in CM",
    type: controlCommands.LEFT,
  },
  {
    abrv: "-rt",
    normalized: "--right <string>",
    desc: "Move right a specified distance in CM",
    type: controlCommands.RIGHT,
  },
  {
    abrv: "-fwd",
    normalized: "--forward <string>",
    desc: "Move forward a specified distance in CM",
    type: controlCommands.FORWARD,
  },
  {
    abrv: "-bk",
    normalized: "--back <string>",
    desc: "Move back a specified distance in CM",
    type: controlCommands.BACK,
  },
  {
    abrv: "-cw",
    normalized: "--clockwise <string>",
    desc: "Rotate clockwise a specified amount in degrees",
    type: controlCommands.CLOCKWISE,
  },
  {
    abrv: "-ccw",
    normalized: "--counter-clockwise <string>",
    desc: "Rotate counter-clockwise a specified amount in degrees",
    type: controlCommands.COUNTER_CLOCKWISE,
  },
  {
    abrv: "-sp",
    normalized: "--stop <string>",
    desc: "Dismisses all movement commands and forces the drone to stay in place",
    type: controlCommands.STOP,
  },
  {
    abrv: "-tkf",
    normalized: "--takeOff <string>",
    desc: "Dismisses all movement commands and forces the drone to stay in place",
    type: controlCommands.TAKEOFF,
  },
  {
    abrv: "-lnd",
    normalized: "--land <string>",
    desc: "Lands the drone in current position",
    type: controlCommands.TAKEOFF,
  },
  {
    abrv: "-spd",
    normalized: "--speed <string>",
    desc: "Set speed to velocity of a specified amount in CM/s",
    type: controlCommands.SPEED,
  },
  {
    abrv: "-flp",
    normalized: "--flip <string>",
    desc: "Flip drone on a specified directional plane",
    type: controlCommands.FLIP,
  },
  {
    abrv: "-go",
    normalized: "--go <x, y, z, speed>",
    desc: "Specify a final position (x, y, z coordinates in CM relative to origin at time of execution) and velocity in CM/s",
    type: controlCommands.GO,
  },
  {
    abrv: "-crv",
    normalized: "--curve <x1, y1, z1, x2, y2, z2, speed>",
    desc: "Specify a curve for the drone to fly on",
    type: controlCommands.GO,
  },
];
