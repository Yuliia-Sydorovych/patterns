import { BaseCommand } from "../BaseCommand.js";
export class SpinCommand extends BaseCommand {
    constructor(betManager, slotMachineManager, uiManager) {
        super(betManager, uiManager);
        this.slotMachineManager = slotMachineManager;
    }
    execute(betAmount) {
        if (this.betManager.placeBet(betAmount)) {
            this.uiManager.updateOnSpinStart();
            this.slotMachineManager.spin(() => {
                const payout = this.slotMachineManager.calculatePayout(betAmount);
                this.betManager.updateBalance(payout);
                this.uiManager.updateOnSpinEnd(payout);
            });
        }
        else {
            this.uiManager.showInsufficientFunds();
        }
    }
}
