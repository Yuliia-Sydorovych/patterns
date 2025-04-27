import { CommandManager } from "../command/CommandManager";

describe("CommandManager", () =>
{
  let manager: CommandManager;
  let command: any;

  beforeEach(() =>
  {
    manager = new CommandManager();
    command =
    {
      execute: jest.fn(),
      undo: jest.fn(),
      redo: jest.fn()
    };
  });

  it("should execute command and store in history", () =>
  {
    manager.executeCommand(command, 100);
    expect(command.execute).toHaveBeenCalledWith(100);
  });

  it("should undo the last command", () =>
  {
    manager.executeCommand(command, 100);
    manager.undo();
    expect(command.undo).toHaveBeenCalled();
  });

  it("should redo the undone command", () =>
  {
    manager.executeCommand(command, 100);
    manager.undo();
    manager.redo();
    expect(command.redo).toHaveBeenCalled();
  });
});
