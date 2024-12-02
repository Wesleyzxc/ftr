let interval: NodeJS.Timeout;
let isPaused: boolean = false;
let frequencyInMilliseconds: number;

export const frequencyMap: Map<number, number> = new Map();

export const printFrequency = () => {
  const frequencyString = Array.from(frequencyMap)
    .map(([number, frequency]) => `${number}:${frequency}`)
    .join(", ");

  console.log(frequencyString);
};

export const setFrequency = (timeInterval: number) => {
  frequencyInMilliseconds = timeInterval;
};

export const startTimer = () => {
  interval = setInterval(() => {
    if (!isPaused) {
      printFrequency();
    }
  }, frequencyInMilliseconds);
};

type Options = { logTimer?: boolean };
export const pauseTimer = ({ logTimer = true }: Options = {}) => {
  if (isPaused) {
    console.log("Timer already paused!");
    return;
  }

  if (interval) {
    clearInterval(interval);
    isPaused = true;

    if (logTimer) {
      console.log("Timer halted");
    }
  }
};

export const resumeTimer = () => {
  if (!isPaused) {
    console.log("Timer isn't paused!");
    return;
  }

  console.log("Timer resumed");
  isPaused = false;
  startTimer();
};
