export class BetCommand {
    constructor(betManager, uiManager) {
        this.betManager = betManager;
        this.uiManager = uiManager;
    }
    execute(value) {
        const result = this.betManager.checkBet(value) ? `Bet of $${value} placed successfully.` : "Insufficient funds to place the bet.";
        this.uiManager.updateGameResult(result);
    }
}
