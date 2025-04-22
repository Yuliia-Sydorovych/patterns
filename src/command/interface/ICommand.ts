export interface ICommand
{
    execute(value: number): void;
    undo?(): void;
    redo?(): void;
}
