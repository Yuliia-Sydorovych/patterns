import { ISlotMachine } from "./interface/ISlotMachine";

export class SlotMachineManager
{
    private slotMachine: ISlotMachine;
  
    constructor(slotMachine: ISlotMachine)
    {
      this.slotMachine = slotMachine;
    }
  
    public spin(onComplete: () => void): void
    {
      this.slotMachine.spinReels();
  
      const spinCheckInterval = setInterval(() =>
      {
        if (!this.slotMachine.areReelsSpinning())
        {
          clearInterval(spinCheckInterval);
          onComplete();
        }
      }, 100);
    }
  
    public calculatePayout(betAmount: number): number
    {
      return this.slotMachine.calculatePayout(betAmount);
    }
  }