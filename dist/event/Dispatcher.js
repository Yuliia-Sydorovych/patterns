export class Dispatcher {
    constructor() {
        this.listeners = [];
    }
    addListener(callback, caller, data) {
        this.listeners.push({ callback, caller, data });
    }
    removeListeners() {
        this.listeners = [];
    }
    dispatch(event) {
        for (const listener of this.listeners) {
            listener.callback.call(listener.caller || null, event);
        }
    }
}
