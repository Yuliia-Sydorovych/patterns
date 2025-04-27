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
});
