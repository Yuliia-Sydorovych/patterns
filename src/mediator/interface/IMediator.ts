export interface IMediator
{
    notify(sender: object, event: string, value?: any): void;
}