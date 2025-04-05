import { SlotMachineManager } from "../../reels/SlotMachineManager";
import { UIManager } from "../../ui/UIManager";
import { BetManager } from "../bet/BetManager";
import { BaseCommand } from "../BaseCommand";

export class SpinCommand extends BaseCommand
{
  private slotMachineManager: SlotMachineManager;

  constructor(betManager: BetManager, slotMachineManager: SlotMachineManager, uiManager: UIManager)
  {
    super(betManager, uiManager);

    this.slotMachineManager = slotMachineManager;
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
