import { BaseCommand } from "../BaseCommand";

export class BetCommand extends BaseCommand
{
  private lastBet: number = 0;

  public execute(value: number): void
  {
    this.lastBet = value;
    
    const result = this.betManager.checkBet(this.lastBet) ? `Bet of $${this.lastBet} placed successfully.` : "Insufficient funds to place the bet.";
    this.uiManager.updateGameResult(result);
  }

  public undo(): void
  {
    this.betManager.updateBalance(this.lastBet);
    this.uiManager.updateGameResult(`Undo bet of $${this.lastBet}`);
  }

  public redo(): void
  {
    this.execute(this.lastBet);
  }
}
