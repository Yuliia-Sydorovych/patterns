import { Event } from "../../event/Event";

export class PlayerBalanceEvent extends Event
{
    public static readonly BALANCE: string = "Balance";

    protected _balance: number;

    public get balance(): number
    {
        return this._balance;
    }

    constructor (balance: number)
    {
        super(PlayerBalanceEvent.BALANCE);

        this._balance = balance;
    }
}
