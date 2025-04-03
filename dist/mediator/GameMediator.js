export class GameMediator {
    constructor(spinCommand, betCommand, player, uiController) {
        this.actions = {};
        this.player = player;
        this.uiController = uiController;
        this.uiController.bindMediator(this);
        this.spinCommand = spinCommand;
        this.betCommand = betCommand;
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
            this.spinCommand.execute(value);
        });
        this.registerAction("bet", (value) => {
            this.betCommand.execute(value);
        });
    }
    registerAction(event, action) {
        this.actions[event] = action;
    }
}
