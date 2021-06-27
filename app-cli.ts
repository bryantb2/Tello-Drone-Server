import { Command } from "commander";
import readline from "readline";
import {controlCommands, sysCommands} from "./config";

const program = new Command();

interface ICustomOption<T = undefined> {
  abrv: string;
  normalized: string;
  desc: string;
  type: T;
}

const systemOptions: ICustomOption<sysCommands>[] = [
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
    abrv: "-wf",
    normalized: "--wifi <ssid> <password>",
    desc: "Set/update the access point of the drone",
    type: sysCommands.RC_CONTROLLER,
  },
];
const flightCommandOptions: ICustomOption<controlCommands>[] = [
  {
    abrv: "-up",
    normalized: "--up <string>",
    desc: "Move up a specified distance in CM",
    type: controlCommands.UP
  },
  {
    abrv: "-dn",
    normalized: "--down <string>",
    desc: "Move down a specified distance in CM",
    type: controlCommands.DOWN
  },
  {
    abrv: "-lf",
    normalized: "--left <string>",
    desc: "Move left a specified distance in CM",
    type: controlCommands.LEFT
  },
  {
    abrv: "-rt",
    normalized: "--right <string>",
    desc: "Move right a specified distance in CM",
    type: controlCommands.RIGHT
  },
  {
    abrv: "-rt",
    normalized: "--right <string>",
    desc: "Move right a specified distance in CM",
    type: controlCommands.RIGHT
  },
  {
    abrv: "-fwd",
    normalized: "--forward <string>",
    desc: "Move forward a specified distance in CM",
    type: controlCommands.FORWARD
  },
  {
    abrv: "-bk",
    normalized: "--back <string>",
    desc: "Move back a specified distance in CM",
    type: controlCommands.BACK
  },
  {
    abrv: "-cw",
    normalized: "--clockwise <string>",
    desc: "Rotate clockwise a specified amount in degrees",
    type: controlCommands.CLOCKWISE
  },
  {
    abrv: "-ccw",
    normalized: "--counter-clockwise <string>",
    desc: "Rotate counter-clockwise a specified amount in degrees",
    type: controlCommands.COUNTER_CLOCKWISE
  },
  {
    abrv: "-sp",
    normalized: "--stop <string>",
    desc: "Dismisses all movement commands and forces the drone to stay in place",
    type: controlCommands.STOP
  },
  {
    abrv: "-tkf",
    normalized: "--takeOff <string>",
    desc: "Dismisses all movement commands and forces the drone to stay in place",
    type: controlCommands.TAKEOFF
  },
  {
    abrv: "-lnd",
    normalized: "--land <string>",
    desc: "Lands the drone in current position",
    type: controlCommands.TAKEOFF
  },
  {
    abrv: "-spd",
    normalized: "--speed <string>",
    desc: "Set speed to velocity of a specified amount in CM/s",
    type: controlCommands.SPEED
  },
  {
    abrv: "-flp",
    normalized: "--flip <string>",
    desc: "Flip drone on a specified directional plane",
    type: controlCommands.FLIP
  },
  {
    abrv: "-go",
    normalized: "--go <string>",
    desc: "Specify a final position (x, y, z coordinates in CM relative to origin at time of execution) and velocity in CM/s",
    type: controlCommands.GO
  }
];

// build out system command options and handler
const systemCommandCLI = program
  .command("system")
  .description("Execute a system command");
systemOptions.forEach((option) => {
  const { abrv, normalized, desc } = option;
  systemCommandCLI.option(abrv, normalized, desc);
});
systemCommandCLI.action((args) => {
  console.log("System command called, args used are: ", args);
});

const flightCommandCLI = program
  .command("control")
  .description("Execute a drone flight command");

  .option(
  )
  .option(
    "-sc",
    "--sys-command <string>",
    "Execute a system command to the drone"
  )
  .option("-r", "--read <string>", "Read and return flight data from the drone")
  .option(
    "-a",
    "--args <string[]>",
    "Arguments for a system or control command"
  );

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`For a list of valid commands, type "--help"`);
const openCLI = (): void => {
  // open cli to user
  rl.question("Enter a command: ", (input) => {
    try {
      const inputArr = input.split(" ");
      console.log("input arr args: ", inputArr);
      program.parse(inputArr, { from: "user" });
      console.log(input);
    } catch (err) {
      console.log("An error has occured: ", err);
    }
    // openCLI()
  });
};

openCLI();
