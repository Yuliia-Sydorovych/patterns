import { IMediator } from "../../mediator/interface/IMediator";

export interface IUIController
{
    bindMediator(mediator: IMediator): void;
    updateGameResult(value: string): void;
    setSpinButtonState(value: boolean): void;
    setBetButtonsState(value: boolean): void;
    setBalanceValue(value: number): void;
}