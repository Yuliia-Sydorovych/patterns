export interface ISlotMachine
{
    spinReels(): void;
    areReelsSpinning(): boolean;
    calculatePayout(betAmount: number): number;
}