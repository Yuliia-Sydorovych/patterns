import { ICommand } from "../interface/ICommand";
import { SlotMachineManager } from "../../reels/SlotMachineManager";
import { UIManager } from "../../ui/UIManager";
import { BetManager } from "../bet/BetManager";

export class SpinCommand implements ICommand
{
  private betManager: BetManager;
  private slotMachineManager: SlotMachineManager;
  private uiManager: UIManager;

  constructor(betManager: BetManager, slotMachineManager: SlotMachineManager, uiManager: UIManager)
  {
    this.betManager = betManager;
    this.slotMachineManager = slotMachineManager;
    this.uiManager = uiManager;
  }

  public execute(betAmount: number): void
  {
    if (this.betManager.placeBet(betAmount))
    {
      this.uiManager.updateOnSpinStart();

      this.slotMachineManager.spin(() =>
      {
        const payout = this.slotMachineManager.calculatePayout(betAmount);
        this.betManager.updateBalance(payout);
        this.uiManager.updateOnSpinEnd(payout);
      });
    }
    else
    {
      this.uiManager.showInsufficientFunds();
    }
  }
}
