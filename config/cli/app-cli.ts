import { Command } from "commander";
import readline from "readline";

const program = new Command();

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
  .description("Execute a drone flight command")

  .option()
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
  });
};

openCLI();
