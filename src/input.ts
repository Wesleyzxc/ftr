import { rl } from "./readline";
import { frequencyMap, pauseTimer, printFrequency, resumeTimer } from "./timer";
import { fibonacciSet } from "./fib";

type Command = "halt" | "resume" | "quit";

const isRecognisedCommand = (input: string): input is Command => {
  return input === "halt" || input === "resume" || input === "quit";
};

const quit = () => {
  pauseTimer({ logTimer: false });
  printFrequency();
  console.log("Thanks for playing, press any key to exit");
  rl.on("line", () => rl.close());
};

const alertFib = (input: number) => {
  if (fibonacciSet.has(input)) {
    console.log("!!! FIB !!!");
  }
};

export const getUserInput = () => {
  rl.question("Please enter the next number\n", (input: string) => {
    if (!isRecognisedCommand(input)) {
      const number = Number.parseInt(input);

      if (isNaN(number)) {
        console.log(`Invalid command entered ${input}`);
      } else {
        alertFib(number);
        frequencyMap.set(number, (frequencyMap.get(number) || 0) + 1);
      }

      getUserInput();
      return;
    }

    switch (input) {
      case "halt":
        pauseTimer();
        break;
      case "resume":
        resumeTimer();
        break;
      case "quit":
        quit();
        return;
      default:
        console.log(`Invalid command entered ${input}\n`);
    }

    getUserInput();
  });
};