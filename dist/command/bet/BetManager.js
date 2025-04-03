export class BetManager {
    constructor(player) {
        this.player = player;
    }
    placeBet(amount) {
        return this.player.placeBet(amount);
    }
    updateBalance(payout) {
        this.player.updateBalance(payout);
    }
    checkBet(value) {
        return this.player.checkBet(value);
    }
}
