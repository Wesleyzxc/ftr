import { frequencyMap, printFrequency } from "../timer";

describe("timer", () => {
  const log = jest.spyOn(console, "log");
  beforeEach(() => {
    frequencyMap.clear();
    jest.clearAllMocks();
  });

  describe("printFrequency", () => {
    it("should print no frequency", () => {
      printFrequency();

      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith("");
    });

    it("should print frequency with values", () => {
      frequencyMap.set(5n, 3);
      frequencyMap.set(3n, 3);

      printFrequency();

      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith("5:3, 3:3");
    });
  });

  describe("startTimer", () => {
    it("should start timer and print frequency at the right time", () => {
      jest.isolateModules(() => {
        const { setFrequency, startTimer, frequencyMap } = require("../timer");
        jest.useFakeTimers();
        frequencyMap.set(5, 3);
        setFrequency(1000);
        startTimer();
        expect(log).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(1000);

        expect(log).toHaveBeenCalledTimes(1);
        expect(log).toHaveBeenCalledWith("5:3");
      });
    });

    it("should start timer and print multiple times", () => {
      jest.isolateModules(() => {
        const { setFrequency, startTimer, frequencyMap } = require("../timer");
        jest.useFakeTimers();
        frequencyMap.set(5, 3);
        setFrequency(1000);

        startTimer();
        expect(log).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(2000);

        expect(log).toHaveBeenCalledTimes(2);
        expect(log).toHaveBeenCalledWith("5:3");
      });
    });
  });

  describe("pauseTimer", () => {
    it("should pause timer and print output", () => {
      jest.isolateModules(() => {
        const { setFrequency, startTimer, pauseTimer } = require("../timer");
        jest.useFakeTimers();
        frequencyMap.set(5n, 3);
        setFrequency(1000);
        startTimer();

        pauseTimer();
        jest.advanceTimersByTime(1000);

        expect(log).toHaveBeenCalledTimes(1);
        expect(log).toHaveBeenCalledWith("Timer halted");
      });
    });

    it("should pause timer without logging", () => {
      jest.isolateModules(() => {
        const { setFrequency, startTimer, pauseTimer } = require("../timer");
        jest.useFakeTimers();
        frequencyMap.set(5n, 3);
        setFrequency(1000);
        startTimer();

        pauseTimer({ logTimer: false });
        jest.advanceTimersByTime(2000);

        expect(log).toHaveBeenCalledTimes(0);
      });
    });

    it("should log already paused timer", () => {
      jest.isolateModules(() => {
        const { setFrequency, startTimer, pauseTimer } = require("../timer");
        setFrequency(1000);
        startTimer();

        pauseTimer();
        pauseTimer();

        expect(log).toHaveBeenCalledTimes(2);
        expect(log).toHaveBeenCalledWith("Timer halted");
        expect(log).toHaveBeenCalledWith("Timer already paused!");
      });
    });
  });

  describe("resumeTimer", () => {
    it("should log timer not paused", () => {
      jest.isolateModules(() => {
        const { setFrequency, startTimer, resumeTimer } = require("../timer");
        setFrequency(1000);
        startTimer();

        resumeTimer();

        expect(log).toHaveBeenCalledTimes(1);
        expect(log).toHaveBeenCalledWith("Timer isn't paused!");
      });
    });

    it("should resume paused timer", () => {
      jest.isolateModules(() => {
        const {
          setFrequency,
          startTimer,
          pauseTimer,
          resumeTimer,
        } = require("../timer");
        jest.useFakeTimers();
        setFrequency(1000);

        startTimer();
        pauseTimer();
        resumeTimer();

        expect(log).toHaveBeenCalledTimes(2);
        expect(log).toHaveBeenCalledWith("Timer halted");
        expect(log).toHaveBeenCalledWith("Timer resumed");
      });
    });
  });
});
