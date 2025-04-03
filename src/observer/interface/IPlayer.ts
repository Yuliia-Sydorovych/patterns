import { IObserver } from "./IObserver";

export interface IPlayer
{
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObservers(): void;
    placeBet(amount: number): boolean;
    updateBalance(payout: number): void;
    checkBet(value: number): boolean;
}