import { UIManager } from "../../ui/UIManager";
import { ICommand } from "../interface/ICommand";
import { BetManager } from "./BetManager";

export class BetCommand implements ICommand
{
  private betManager: BetManager;
  private uiManager: UIManager;

  constructor(betManager: BetManager, uiManager: UIManager)
  {
    this.betManager = betManager;
    this.uiManager = uiManager;
  }

  public execute(value: number): void
  {
    const result = this.betManager.checkBet(value) ? `Bet of $${value} placed successfully.` : "Insufficient funds to place the bet.";
    this.uiManager.updateGameResult(result);
  }
}
