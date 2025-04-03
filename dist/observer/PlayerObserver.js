export class PlayerObserver {
    constructor(uiController) {
        this.uiController = uiController;
    }
    update(value) {
        this.uiController.setBalanceValue(value);
    }
}
