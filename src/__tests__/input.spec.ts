import { getUserInput } from "../input";
import * as timer from "../timer";

jest.mock("../readline", () => {
  const originalModule = jest.requireActual("../readline");
  const question = jest.fn();

  return {
    rl: {
      ...originalModule.rl,
      question: question
        .mockImplementationOnce((_, cb) => {
          cb("halt");
        })
        .mockImplementationOnce((_, cb) => {
          cb("5"); // fib number
        })
        .mockImplementationOnce((_, cb) => {
          cb("resume");
        })
        .mockImplementationOnce((_, cb) => {
          cb("invalid");
        })
        .mockImplementationOnce((_, cb) => {
          cb("quit");
        })
        .mockImplementationOnce((_, cb) => {
          cb("bar");
        }),
      on: jest.fn().mockImplementationOnce((_, cb) => {
        cb("exit");
      }),
      close: jest.fn().mockImplementation(() => originalModule.rl.close()),
    },
  };
});

describe("input", () => {
  const log = jest.spyOn(console, "log");
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get user input", () => {
    jest.useFakeTimers();
    timer.setFrequency(1000);
    timer.startTimer();

    const pauseTimer = jest.spyOn(timer, "pauseTimer");
    const resumeTimer = jest.spyOn(timer, "resumeTimer");
    // from quit
    const printFrequency = jest.spyOn(timer, "printFrequency");

    getUserInput();

    expect(pauseTimer).toHaveBeenCalledTimes(2);
    expect(resumeTimer).toHaveBeenCalledTimes(1);
    expect(printFrequency).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledTimes(6);
    expect(log).toHaveBeenCalledWith("Timer halted");
    expect(log).toHaveBeenCalledWith("!!! FIB !!!");
    expect(log).toHaveBeenCalledWith("Timer resumed");
    expect(log).toHaveBeenCalledWith("Invalid command entered invalid");
    expect(log).toHaveBeenCalledWith("5:1");
    expect(log).toHaveBeenCalledWith(
      "Thanks for playing, press any key to exit",
    );
  });
});
