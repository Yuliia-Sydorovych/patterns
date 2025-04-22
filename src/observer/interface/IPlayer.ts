import { IObserver } from "./IObserver";

export interface IPlayer<T>
{
    addObserver(observer: IObserver<T>): void;
    removeObserver(observer: IObserver<T>): void;
    notifyObservers(): void;
    placeBet(amount: number): boolean;
    updateBalance(payout: number): void;
    checkBet(value: number): boolean;
}
