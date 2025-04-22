import { Dispatcher } from "./Dispatcher.js";
export class EventDispatcher {
    constructor() {
        this._dispatchers = {};
    }
    addEventListener(type, onEvent, caller = null, data) {
        let dispatcher = this._dispatchers[type];
        if (!dispatcher) {
            dispatcher = new Dispatcher();
            this._dispatchers[type] = dispatcher;
        }
        dispatcher.addListener(onEvent, caller, data);
        return this;
    }
    removeListeners() {
        for (const key in this._dispatchers) {
            if (Object.prototype.hasOwnProperty.call(this._dispatchers, key)) {
                this._dispatchers[key].removeListeners();
            }
        }
    }
    dispatch(e) {
        const dispatcher = this._dispatchers[e.type];
        if (dispatcher) {
            dispatcher.dispatch(e);
        }
    }
    getDispatcher(type) {
        return this._dispatchers[type];
    }
}
