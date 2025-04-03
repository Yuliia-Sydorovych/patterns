export class SpinCommand {
    constructor(betManager, slotMachineManager, uiManager) {
        this.betManager = betManager;
        this.slotMachineManager = slotMachineManager;
        this.uiManager = uiManager;
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
