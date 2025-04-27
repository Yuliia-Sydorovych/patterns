import { Player } from "../observer/Player";

describe("Player", () =>
{
  let player: Player;

  beforeEach(() =>
  {
    player = new Player(1000);
  });

  it("should update balance and notify", () =>
  {
    const observer = { update: jest.fn() };
    player.addObserver(observer);
    player.updateBalance(100);

    expect(observer.update).toHaveBeenCalledWith(1100);
  });

  it("should place a bet successfully", () =>
  {
    const observer = { update: jest.fn() };
    player.addObserver(observer);
    const result = player.placeBet(500);

    expect(result).toBe(true);
    expect(observer.update).toHaveBeenCalledWith(500);
  });

  it("should not place a bet with insufficient funds", () =>
  {
    const result = player.placeBet(2000);
    expect(result).toBe(false);
  });

  it("should check if the bet is possible", () =>
  {
    expect(player.checkBet(500)).toBe(true);
    expect(player.checkBet(2000)).toBe(false);
  });

  it("should add and remove an observer", () =>
  {
    const observer = { update: jest.fn() };
    player.addObserver(observer);
    player.updateBalance(100);
    
    expect(observer.update).toHaveBeenCalledWith(1100);
    
    player.removeObserver(observer);
    player.updateBalance(100);

    expect(observer.update).toHaveBeenCalledTimes(1);
  });

  it("should notify observers when balance is updated", () =>
  {
    const observer1 = { update: jest.fn() };
    const observer2 = { update: jest.fn() };

    player.addObserver(observer1);
    player.addObserver(observer2);

    player.updateBalance(100);

    expect(observer1.update).toHaveBeenCalledWith(1100);
    expect(observer2.update).toHaveBeenCalledWith(1100);
  });

  it("should handle edge case with zero balance", () =>
  {
    const observer = { update: jest.fn() };
    const zeroBalancePlayer = new Player(0);

    zeroBalancePlayer.addObserver(observer);

    zeroBalancePlayer.updateBalance(50);
    expect(observer.update).toHaveBeenCalledWith(50);

    const result = zeroBalancePlayer.placeBet(50);
    expect(result).toBe(true);
    expect(observer.update).toHaveBeenCalledWith(0);
  });
});
