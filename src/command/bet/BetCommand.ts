import { BaseCommand } from "../BaseCommand";

export class BetCommand extends BaseCommand
{
  public execute(value: number): void
  {
    const result = this.betManager.checkBet(value) ? `Bet of $${value} placed successfully.` : "Insufficient funds to place the bet.";
    this.uiManager.updateGameResult(result);
  }
}
