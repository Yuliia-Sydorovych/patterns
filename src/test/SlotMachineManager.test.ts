import { ISlotMachine } from "../reels/interface/ISlotMachine";
import { SlotMachineManager } from "../reels/SlotMachineManager";

describe("SlotMachineManager", () =>
{
  let manager: SlotMachineManager;
  let mockSlotMachine: ISlotMachine;

  beforeEach(() =>
  {
    mockSlotMachine =
    {
      spinReels: jest.fn(() =>
      {
        setTimeout(() => {}, 100);
      }),
      calculatePayout: jest.fn(() => 100),
      areReelsSpinning: jest.fn(() => false),
    };

    manager = new SlotMachineManager(mockSlotMachine);
    jest.useFakeTimers();
  });

  afterEach(() =>
  {
    jest.runAllTimers();
  });

  it("should start spin and call onComplete", () =>
  {
    const onComplete = jest.fn();

    manager.spin(onComplete);

    jest.advanceTimersByTime(150);

    expect(onComplete).toHaveBeenCalled();
  });

  it("should calculate payout", () =>
  {
    const betAmount = 50;
    const payout = manager.calculatePayout(betAmount);

    expect(payout).toBe(100);
  });
});
