import { Event } from "./Event";

type TListener = {
  callback: (e: Event) => void;
  caller?: any;
  data?: any;
};

export class Dispatcher
{
  private listeners: TListener[] = [];

  public addListener(callback: (e: Event) => void, caller?: any, data?: any): void
  {
    this.listeners.push({ callback, caller, data });
  }

  public removeListeners(): void
  {
    this.listeners = [];
  }

  public dispatch(event: Event): void
  {
    for (const listener of this.listeners)
    {
      listener.callback.call(listener.caller || null, event);
    }
  }
}
