import { GameMediator } from "../mediator/GameMediator";

describe("GameMediator", () =>
{
  let mediator: GameMediator;
  let player: any;
  let uiController: any;
  let commandManager: any;
  let spinCommand: any;
  let betCommand: any;

  beforeEach(() =>
  {
    player = { updateBalance: jest.fn() };
    uiController = { bindMediator: jest.fn() };
    commandManager = { executeCommand: jest.fn(), undo: jest.fn(), redo: jest.fn() };
    spinCommand = { execute: jest.fn() };
    betCommand = { execute: jest.fn() };
    mediator = new GameMediator(spinCommand, betCommand, player, uiController, commandManager);
  });

  it("should execute spin command", () =>
  {
    mediator.notify({}, "spin", 100);
    expect(commandManager.executeCommand).toHaveBeenCalledWith(spinCommand, 100);
  });

  it("should execute bet command", () =>
  {
    mediator.notify({}, "bet", 50);
    expect(commandManager.executeCommand).toHaveBeenCalledWith(betCommand, 50);
  });

  it("should update player balance", () =>
  {
    mediator.notify({}, "funds", 200);
    expect(player.updateBalance).toHaveBeenCalledWith(200);
  });

  it("should undo and redo commands", () =>
  {
    mediator.notify({}, "undo", 0);
    mediator.notify({}, "redo", 0);
    expect(commandManager.undo).toHaveBeenCalled();
    expect(commandManager.redo).toHaveBeenCalled();
  });
});
