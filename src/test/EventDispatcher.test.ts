import { EventDispatcher } from "../event/EventDispatcher";
import { Event } from "../event/Event";

describe("EventDispatcher", () =>
{
  let eventDispatcher: EventDispatcher;
  let callback: jest.Mock;

  beforeEach(() =>
  {
    eventDispatcher = new EventDispatcher();
    callback = jest.fn();
  });

  it("should add and dispatch event", () =>
  {
    eventDispatcher.addEventListener("test", callback);
    eventDispatcher.dispatch(new Event("test"));

    expect(callback).toHaveBeenCalled();
  });

  it("should remove all listeners", () =>
  {
    eventDispatcher.addEventListener("test", callback);
    eventDispatcher.removeListeners();
    eventDispatcher.dispatch(new Event("test"));

    expect(callback).not.toHaveBeenCalled();
  });
});
