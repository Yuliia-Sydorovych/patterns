import { PlayerBalanceEvent } from "./event/PlayerBalanceEvent";
import { EventDispatcher } from "../event/EventDispatcher";
import { IObserver } from "./interface/IObserver";

export class PlayerObserver implements IObserver<number>
{
    private dispatcher: EventDispatcher;

    constructor(dispatcher: EventDispatcher)
    {
        this.dispatcher = dispatcher;
    }

    public update(value: number): void
    {
        this.dispatcher.dispatch(new PlayerBalanceEvent(value));
    }
}
