import { UIManager } from "../ui/UIManager";
import { BetManager } from "./bet/BetManager";
import { ICommand } from "./interface/ICommand";

export abstract class BaseCommand implements ICommand
{
  protected betManager: BetManager;
  protected uiManager: UIManager;

  constructor(betManager: BetManager, uiManager: UIManager)
  {
    this.betManager = betManager;
    this.uiManager = uiManager;
  }

  abstract execute(value: number): void;
  
  undo?(): void;
  redo?(): void;
}
