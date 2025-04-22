import { BaseCommand } from "../BaseCommand.js";
export class BetCommand extends BaseCommand {
    constructor() {
        super(...arguments);
        this.lastBet = 0;
    }
    execute(value) {
        this.lastBet = value;
        const result = this.betManager.checkBet(this.lastBet) ? `Bet of $${this.lastBet} placed successfully.` : "Insufficient funds to place the bet.";
        this.uiManager.updateGameResult(result);
    }
    undo() {
        this.betManager.updateBalance(this.lastBet);
        this.uiManager.updateGameResult(`Undo bet of $${this.lastBet}`);
    }
    redo() {
        this.execute(this.lastBet);
    }
}
