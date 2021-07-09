import commander, { Command } from "commander";
import readline from "readline";
import {
  readOptions,
  systemOptions,
  controlOptions,
  ReadOptions,
  SystemOptions,
  ControlOptions,
  readCommands,
  sysCommands,
  controlCommands,
} from "../commands";
import { DroneService } from "../../services";
import { ICustomOption } from "./types";

// const drone = new DroneService();

const program = new Command();
program.exitOverride(/* (err) => {
  // console.log("Error thrown by commander: ", err);
} */);

const setOptionsToCommand = (
  command: commander.Command,
  cliOptions: ReadOptions | SystemOptions | ControlOptions,
  actionCallback: (args: any) => void
): void => {
  cliOptions.forEach((option) => {
    const { abrv, normalized, desc } = option;
    command.option(abrv, normalized, desc);
  });
  command.action(actionCallback);
};

/*
const findActionByArg = (

): readCommands | sysCommands | controlCommands */

// build out system command options and handler
const systemCommandCLI = program
  .command("system")
  .description("Execute a system command to configure the drone");
setOptionsToCommand(systemCommandCLI, systemOptions, (args) => {
  // drone.executeSystemCommand()
  console.log("System command called, args used are: ", args);
});

const flightCommandCLI = program
  .command("control")
  .description("Execute a control command to manipulate drone in flight");
setOptionsToCommand(flightCommandCLI, controlOptions, (args) => {
  console.log("Control command called, args used are: ", args);
});

const readCommandCLI = program
  .command("read")
  .description("Execute a read command to get drone state");
setOptionsToCommand(readCommandCLI, readOptions, (args) => {
  console.log("Read command called, args used are: ", args);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openCLI = (firstRun: boolean = false): void => {
  if (firstRun) {
    console.log("---------------------");
    console.log("Tello Drone CLI Tool");
    console.log("---------------------\n");
    console.log(program.helpInformation());
  }
  // open cli to user
  rl.question("Enter a command: ", (input) => {
    try {
      const inputArr = input.split(" ");
      console.log("input arr args: ", inputArr);
      program.parse(inputArr, { from: "user" });
      console.log(input);
      openCLI();
    } catch (err) {
      openCLI();
    }
  });
};

openCLI(true);
