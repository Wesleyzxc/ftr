import { setFrequency, startTimer } from "./timer";
import { rl } from "./readline";
import { getUserInput } from "./input";

const millisecondsPerSecond = 1000;

const main = () => {
  rl.question(
    "Please input the amount of time in seconds between emitting numbers and their frequency\n",
    (answer: string) => {
      const parsedAnswer = parseInt(answer);
      if (isNaN(parsedAnswer) || parsedAnswer <= 0) {
        // TODO: consider edge case return
        console.log("Please enter a valid positive number.");
        main();
      } else {
        const frequencyInMilliseconds = parsedAnswer * millisecondsPerSecond;

        setFrequency(frequencyInMilliseconds);
        startTimer();

        getUserInput();
      }
    },
  );
};

main();
