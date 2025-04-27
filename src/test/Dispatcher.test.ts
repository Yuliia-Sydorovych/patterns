import { Dispatcher } from "../event/Dispatcher";
import { Event } from "../event/Event";

describe("Dispatcher", () =>
{
  let dispatcher: Dispatcher;
  let callback: jest.Mock;

  beforeEach(() =>
  {
    dispatcher = new Dispatcher();
    callback = jest.fn();
  });

  it("should call listener on event dispatch", () =>
  {
    dispatcher.addListener(callback);
    dispatcher.dispatch(new Event("test"));

    expect(callback).toHaveBeenCalled();
  });

  it("should remove all listeners", () =>
  {
    dispatcher.addListener(callback);
    dispatcher.removeListeners();
    dispatcher.dispatch(new Event("test"));

    expect(callback).not.toHaveBeenCalled();
  });
});
