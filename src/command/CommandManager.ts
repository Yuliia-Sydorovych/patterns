import { ICommand } from "./interface/ICommand";

export class CommandManager
{
    private history: ICommand[] = [];
    private undone: ICommand[] = [];
  
    executeCommand(command: ICommand, value: number): void
    {
      command.execute(value);

      this.history.push(command);

      this.undone = [];
    }
  
    undo(): void
    {
      const command = this.history.pop();

      if (command && command.undo)
      {
        command.undo();

        this.undone.push(command);
      }
    }
  
    redo(): void
    {
      const command = this.undone.pop();
      
      if (command && command.redo) 
      {
        command.redo();

        this.history.push(command);
      }
    }
  }
  