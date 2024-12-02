import { setFrequency, startTimer } from "./timer";
import { rl } from "./readline";
import { getUserInput } from "./input";

const millisecondsPerSecond = 1000;

function promptForSeconds(): void {
  rl.question(
    "Please input the amount of time in seconds between emitting numbers and their frequency\n",
    (answer: string) => {
      const parsedAnswer = parseInt(answer);
      if (isNaN(parsedAnswer) || parsedAnswer <= 0) {
        // TODO: consider edge case return
        console.log("Please enter a valid positive number.");
        promptForSeconds();
      } else {
        const frequencyInMilliseconds = parsedAnswer * millisecondsPerSecond;

        setFrequency(frequencyInMilliseconds);
        startTimer();

        getUserInput();
      }
    },
  );
}

promptForSeconds();
