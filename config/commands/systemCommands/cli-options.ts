import { sysCommands } from "./types";
import { ICustomOption } from "../../cli/types";

export type SystemOptions = ICustomOption<sysCommands>[];
export const systemOptions: ICustomOption<sysCommands>[] = [
  {
    abrv: "-init",
    normalized: "--initialized",
    desc: "Place the drone into SDK mode",
    type: sysCommands.INITIALIZE_DRONE,
  },
  {
    abrv: "-son",
    normalized: "--stream-on",
    desc: "Turn on the drone's video stream",
    type: sysCommands.STREAM_ON,
  },
  {
    abrv: "-soff",
    normalized: "--stream-off",
    desc: "Turn off the drone's video stream",
    type: sysCommands.STREAM_OFF,
  },
  {
    abrv: "-emg",
    normalized: "--emergency",
    desc: "Immediately cuts all flight power (careful, you will drop that fucker mid-flight with this one)",
    type: sysCommands.EMERGENCY,
  },
  {
    abrv: "-rcc",
    normalized: "--rc-controller <0 | 1 | 2>",
    desc: "Set the wifi channel of the drone",
    type: sysCommands.RC_CONTROLLER,
  },
  {
    abrv: "-ap",
    normalized: "--accessPoint <ssid> <password>",
    desc: "Set/update the access point of the drone",
    type: sysCommands.CHANGE_ACCESS_POINT,
  },
];
