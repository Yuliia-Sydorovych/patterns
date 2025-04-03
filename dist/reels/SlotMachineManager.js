export class SlotMachineManager {
    constructor(slotMachine) {
        this.slotMachine = slotMachine;
    }
    spin(onComplete) {
        this.slotMachine.spinReels();
        const spinCheckInterval = setInterval(() => {
            if (!this.slotMachine.areReelsSpinning()) {
                clearInterval(spinCheckInterval);
                onComplete();
            }
        }, 100);
    }
    calculatePayout(betAmount) {
        return this.slotMachine.calculatePayout(betAmount);
    }
}
