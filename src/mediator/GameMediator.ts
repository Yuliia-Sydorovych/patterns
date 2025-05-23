import { CommandManager } from "../command/CommandManager";
import { ICommand } from "../command/interface/ICommand";
import { IPlayer } from "../observer/interface/IPlayer";
import { IUIController } from "../ui/interface/IUIController";
import { IMediator } from "./interface/IMediator";

export class GameMediator implements IMediator
{
    private player: IPlayer<number>;
    private uiController: IUIController;
    private commandManager: CommandManager;
    private spinCommand: ICommand;
    private betCommand: ICommand;
    private actions: { [key: string]: (value: number) => void } = {};

    constructor(
        spinCommand: ICommand,
        betCommand: ICommand,
        player: IPlayer<number>,
        uiController: IUIController,
        commandManager: CommandManager
    ) {
        this.player = player;

        this.uiController = uiController;
        this.uiController.bindMediator(this);

        this.spinCommand = spinCommand;
        this.betCommand = betCommand;
        this.commandManager = commandManager;

        this.initializeActions();        
    }

    public notify(_sender: object, event: string, value: number): void
    {
        if (this.actions[event])
        {
            this.actions[event](value);
        }
    }

    private initializeActions(): void
    {
        this.registerAction("funds", (value) => this.player.updateBalance(value));

        this.registerAction("spin", (value) =>
        {
            this.commandManager.executeCommand(this.spinCommand, value);
        });

        this.registerAction("bet", (value) =>
        {
            this.commandManager.executeCommand(this.betCommand, value);
        });

        this.registerAction("undo", () => this.commandManager.undo());
        
        this.registerAction("redo", () => this.commandManager.redo());
    }

    private registerAction(event: string, action: (value: number) => void): void
    {
        this.actions[event] = action;
    }
}
