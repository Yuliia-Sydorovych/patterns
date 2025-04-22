import { PlayerBalanceEvent } from "./event/PlayerBalanceEvent.js";
export class PlayerObserver {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    update(value) {
        this.dispatcher.dispatch(new PlayerBalanceEvent(value));
    }
}
