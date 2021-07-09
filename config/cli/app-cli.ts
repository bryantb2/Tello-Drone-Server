import commander, { Command } from "commander";
import readline from "readline";
import {
  readOptions,
  systemOptions,
  controlOptions,
  ReadOptions,
  SystemOptions,
  ControlOptions,
} from "../commands";

const program = new Command();

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

// build out system command options and handler
const systemCommandCLI = program
  .command("system")
  .description("Execute a system command to configure the drone");
setOptionsToCommand(systemCommandCLI, systemOptions, (args) => {
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
  });
};

openCLI();
