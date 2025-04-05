import { BaseCommand } from "../BaseCommand.js";
export class BetCommand extends BaseCommand {
    execute(value) {
        const result = this.betManager.checkBet(value) ? `Bet of $${value} placed successfully.` : "Insufficient funds to place the bet.";
        this.uiManager.updateGameResult(result);
    }
}
