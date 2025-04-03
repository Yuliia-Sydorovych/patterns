import { IUIController } from "../ui/interface/IUIController";
import { IObserver } from "./interface/IObserver";

export class PlayerObserver implements IObserver
{
    private uiController: IUIController;

    constructor(uiController: IUIController)
    {
        this.uiController = uiController;
    }

    public update(value: number): void
    {
        this.uiController.setBalanceValue(value);
    }
}