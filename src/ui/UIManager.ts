import { IUIController } from "./interface/IUIController";

export class UIManager
{
    private uiController: IUIController;
  
    constructor(uiController: IUIController)
    {
      this.uiController = uiController;
    }
  
    public updateOnSpinStart(): void
    {
      this.uiController.setSpinButtonState(false);
      this.uiController.setBetButtonsState(false);
      this.uiController.updateGameResult("Spinning...");
    }
  
    public updateOnSpinEnd(payout: number): void
    {
      this.uiController.setSpinButtonState(true);
      this.uiController.setBetButtonsState(true);
  
      const message = payout > 0 ? `You won $${payout}!` : "You lost this round.";
      this.uiController.updateGameResult(message);
    }
  
    public showInsufficientFunds(): void
    {
      this.uiController.updateGameResult("Insufficient funds to place the bet.");
    }

    public updateGameResult(value: string): void
    {
      this.uiController.updateGameResult(value);
    }
  }