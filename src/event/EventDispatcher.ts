import { Dispatcher } from "./Dispatcher";
import { Event } from "./Event";

export class EventDispatcher
{
    private _dispatchers: { [key: string]: Dispatcher } = {};

    public addEventListener(type: string, onEvent: (e: Event) => void, caller: any = null, data?: any): this
    {
        let dispatcher = this._dispatchers[type];
        if (!dispatcher)
        {
            dispatcher = new Dispatcher();
            this._dispatchers[type] = dispatcher;
        }
        dispatcher.addListener(onEvent, caller, data);
        return this;
    }

    public removeListeners(): void
    {
        for (const key in this._dispatchers)
        {
            if (Object.prototype.hasOwnProperty.call(this._dispatchers, key))
            {
                this._dispatchers[key].removeListeners();
            }
        }
    }

    public dispatch(e: Event): void
    {
        const dispatcher = this._dispatchers[e.type];
        if (dispatcher)
        {
           dispatcher.dispatch(e); 
        }
    }

    public getDispatcher(type: string): Dispatcher
    {
        return this._dispatchers[type];
    }
}