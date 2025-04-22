import { IPlayer } from "../../observer/interface/IPlayer";

export class BetManager
{
  private player: IPlayer<number>;

  constructor(player: IPlayer<number>)
  {
    this.player = player;
  }

  public placeBet(amount: number): boolean
  {
    return this.player.placeBet(amount);
  }

  public updateBalance(payout: number): void
  {
    this.player.updateBalance(payout);
  }

  public checkBet(value: number): boolean
  {
    return this.player.checkBet(value);
  }
}
