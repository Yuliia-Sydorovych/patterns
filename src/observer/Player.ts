import { IObserver } from "./interface/IObserver";
import { IPlayer } from "./interface/IPlayer";

export class Player implements IPlayer<number>
{
  private balance: number;
  private observers: IObserver<number>[] = [];

  constructor(initialBalance: number)
  {
    this.balance = initialBalance;
  }

  public updateBalance(amount: number): void
  {
    this.balance += amount;
    this.notifyObservers();
  }

  public placeBet(amount: number): boolean
  {
    if (this.balance >= amount)
    {
      this.balance -= amount;
      this.notifyObservers();
      return true;
    }
    return false;
  }

  public checkBet(amount: number): boolean
  {
    return this.balance >= amount;
  }

  public addObserver(observer: IObserver<number>): void
  {
    this.observers.push(observer);
  }

  public removeObserver(observer: IObserver<number>): void
  {
    this.observers = this.observers.filter(o => o !== observer);
  }

  public notifyObservers(): void
  {
    this.observers.forEach(observer => observer.update(this.balance));
  }
}
