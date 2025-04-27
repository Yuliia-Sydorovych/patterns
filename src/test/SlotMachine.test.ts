import { SlotMachine } from "../reels/SlotMachine";

describe("SlotMachine", () =>
{
  const reel =
  {
    spin: jest.fn(),
    stop: jest.fn(),
    getCurrentSymbol: jest.fn().mockReturnValue("🍒"),
    isSpinning: jest.fn().mockReturnValue(false)
  };
  const slotMachine = new SlotMachine([reel as any, reel as any, reel as any]);

  it("should spin all reels", () =>
  {
    slotMachine.spinReels();
    expect(reel.spin).toHaveBeenCalledTimes(3);
  });

  it("should stop all reels after delay", async () =>
  {
    jest.useFakeTimers();
    slotMachine.spinReels();
    jest.advanceTimersByTime(2100);
    expect(reel.stop).toHaveBeenCalledTimes(3);
    jest.useRealTimers();
  });

  it("should calculate payout correctly for matching symbols", () =>
  {
    const payout = slotMachine.calculatePayout(100);
    expect(payout).toBe(200);
  });

  it("should calculate payout zero for different symbols", () =>
  {
    (reel.getCurrentSymbol as jest.Mock).mockReturnValueOnce("🍒").mockReturnValueOnce("🍋").mockReturnValueOnce("🍊");
    const payout = slotMachine.calculatePayout(100);
    expect(payout).toBe(0);
  });
});
