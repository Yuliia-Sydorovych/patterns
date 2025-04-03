export class UIManager {
    constructor(uiController) {
        this.uiController = uiController;
    }
    updateOnSpinStart() {
        this.uiController.setSpinButtonState(false);
        this.uiController.setBetButtonsState(false);
        this.uiController.updateGameResult("Spinning...");
    }
    updateOnSpinEnd(payout) {
        this.uiController.setSpinButtonState(true);
        this.uiController.setBetButtonsState(true);
        const message = payout > 0 ? `You won $${payout}!` : "You lost this round.";
        this.uiController.updateGameResult(message);
    }
    showInsufficientFunds() {
        this.uiController.updateGameResult("Insufficient funds to place the bet.");
    }
    updateGameResult(value) {
        this.uiController.updateGameResult(value);
    }
}
