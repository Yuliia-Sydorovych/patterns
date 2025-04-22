export class GameMediator {
    constructor(spinCommand, betCommand, player, uiController, commandManager) {
        this.actions = {};
        this.player = player;
        this.uiController = uiController;
        this.uiController.bindMediator(this);
        this.spinCommand = spinCommand;
        this.betCommand = betCommand;
        this.commandManager = commandManager;
        this.initializeActions();
    }
    notify(_sender, event, value) {
        if (this.actions[event]) {
            this.actions[event](value);
        }
    }
    initializeActions() {
        this.registerAction("funds", (value) => this.player.updateBalance(value));
        this.registerAction("spin", (value) => {
            this.commandManager.executeCommand(this.spinCommand, value);
        });
        this.registerAction("bet", (value) => {
            this.commandManager.executeCommand(this.betCommand, value);
        });
        this.registerAction("undo", () => this.commandManager.undo());
        this.registerAction("redo", () => this.commandManager.redo());
    }
    registerAction(event, action) {
        this.actions[event] = action;
    }
}
