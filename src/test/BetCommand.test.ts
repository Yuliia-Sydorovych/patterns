import { BetCommand } from "../command/bet/BetCommand";
import { BetManager } from "../command/bet/BetManager";
import { UIManager } from "../ui/UIManager";

describe("BetCommand", () =>
{
  let betCommand: BetCommand;
  let betManager: BetManager;
  let uiManager: UIManager;

  beforeEach(() =>
  {
    betManager = { checkBet: jest.fn(), updateBalance: jest.fn() } as any;
    uiManager = { updateGameResult: jest.fn() } as any;
    betCommand = new BetCommand(betManager, uiManager);
  });

  it("should place a bet successfully if funds are sufficient", () =>
  {
    (betManager.checkBet as jest.Mock).mockReturnValue(true);

    betCommand.execute(100);

    expect(uiManager.updateGameResult).toHaveBeenCalledWith("Bet of $100 placed successfully.");
    expect(uiManager.updateGameResult).toMatchSnapshot();
  });

  it("should fail to place bet if funds are insufficient", () =>
  {
    (betManager.checkBet as jest.Mock).mockReturnValue(false);

    betCommand.execute(100);

    expect(uiManager.updateGameResult).toHaveBeenCalledWith("Insufficient funds to place the bet.");
    expect(uiManager.updateGameResult).toMatchSnapshot();
  });

  it("should undo the last bet", () =>
  {
    betCommand["lastBet"] = 100;
    betCommand.undo();

    expect(betManager.updateBalance).toHaveBeenCalledWith(100);
    expect(uiManager.updateGameResult).toHaveBeenCalledWith("Undo bet of $100");
    expect(uiManager.updateGameResult).toMatchSnapshot();
  });

  it("should redo the last bet", () =>
  {
    betCommand["lastBet"] = 50;
    jest.spyOn(betCommand, "execute");

    betCommand.redo();

    expect(betCommand.execute).toHaveBeenCalledWith(50);
    expect(uiManager.updateGameResult).toMatchSnapshot();
  });
});
