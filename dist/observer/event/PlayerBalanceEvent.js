import { Event } from "../../event/Event.js";
export class PlayerBalanceEvent extends Event {
    get balance() {
        return this._balance;
    }
    constructor(balance) {
        super(PlayerBalanceEvent.BALANCE);
        this._balance = balance;
    }
}
PlayerBalanceEvent.BALANCE = "Balance";
