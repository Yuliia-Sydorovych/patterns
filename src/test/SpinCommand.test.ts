import { BetManager } from "../command/bet/BetManager";
import { SpinCommand } from "../command/spin/SpinCommand";
import { SlotMachineManager } from "../reels/SlotMachineManager";
import { UIManager } from "../ui/UIManager";

describe('SpinCommand', () =>
{
  let betManager: jest.Mocked<BetManager>;
  let slotMachineManager: jest.Mocked<SlotMachineManager>;
  let uiManager: jest.Mocked<UIManager>;
  let spinCommand: SpinCommand;

  beforeEach(() =>
  {
    betManager =
    {
      placeBet: jest.fn(),
      updateBalance: jest.fn(),
    } as unknown as jest.Mocked<BetManager>;

    slotMachineManager =
    {
      spin: jest.fn(),
      calculatePayout: jest.fn(),
    } as unknown as jest.Mocked<SlotMachineManager>;

    uiManager =
    {
      updateOnSpinStart: jest.fn(),
      updateOnSpinEnd: jest.fn(),
      showInsufficientFunds: jest.fn(),
    } as unknown as jest.Mocked<UIManager>;

    spinCommand = new SpinCommand(betManager, slotMachineManager, uiManager);
  });

  it('should spin and update balance when bet is placed successfully', () =>
  {
    const betAmount = 100;
    const payout = 250;
    betManager.placeBet.mockReturnValue(true);
    slotMachineManager.calculatePayout.mockReturnValue(payout);

    spinCommand.execute(betAmount);

    expect(betManager.placeBet).toHaveBeenCalledWith(betAmount);
    expect(uiManager.updateOnSpinStart).toHaveBeenCalled();

    expect(slotMachineManager.spin).toHaveBeenCalled();
    const spinCallback = slotMachineManager.spin.mock.calls[0][0];
    spinCallback(); 

    expect(slotMachineManager.calculatePayout).toHaveBeenCalledWith(betAmount);
    expect(betManager.updateBalance).toHaveBeenCalledWith(payout);
    expect(uiManager.updateOnSpinEnd).toHaveBeenCalledWith(payout);

    expect(uiManager.updateOnSpinEnd).toMatchSnapshot();
  });

  it('should show insufficient funds if bet cannot be placed', () =>
  {
    const betAmount = 100;
    betManager.placeBet.mockReturnValue(false);

    spinCommand.execute(betAmount);

    expect(betManager.placeBet).toHaveBeenCalledWith(betAmount);
    expect(uiManager.showInsufficientFunds).toHaveBeenCalled();
    expect(uiManager.updateOnSpinStart).not.toHaveBeenCalled();
    expect(slotMachineManager.spin).not.toHaveBeenCalled();
    expect(uiManager.updateOnSpinEnd).not.toHaveBeenCalled();

    expect(uiManager.showInsufficientFunds).toMatchSnapshot();
  });
});
