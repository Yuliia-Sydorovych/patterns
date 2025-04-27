import { BetManager } from "../command/bet/BetManager";

describe("BetManager", () =>
{
  const player = {
    placeBet: jest.fn(),
    updateBalance: jest.fn(),
    checkBet: jest.fn()
  };
  const betManager = new BetManager(player as any);

  it("should place bet through player", () =>
  {
    betManager.placeBet(100);
    expect(player.placeBet).toHaveBeenCalledWith(100);
  });

  it("should update balance through player", () =>
  {
    betManager.updateBalance(200);
    expect(player.updateBalance).toHaveBeenCalledWith(200);
  });

  it("should check bet through player", () =>
  {
    betManager.checkBet(300);
    expect(player.checkBet).toHaveBeenCalledWith(300);
  });
});
