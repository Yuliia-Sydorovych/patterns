import { Event } from "./Event.js";
export class BalanceEvent extends Event {
    get balance() {
        return this._balance;
    }
    constructor(balance) {
        super(BalanceEvent.BALANCE);
        this._balance = balance;
    }
}
BalanceEvent.BALANCE = "Balance";
