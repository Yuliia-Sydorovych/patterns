import { Player } from "./observer/Player";
import { Reel } from "./reels/Reel";
import { GameMediator } from "./mediator/GameMediator";
import { PlayerObserver } from "./observer/PlayerObserver";
import { SlotMachine } from "./reels/SlotMachine";
import { UIController } from "./ui/UIController";
import { BetManager } from "./command/bet/BetManager";
import { SlotMachineManager } from "./reels/SlotMachineManager";
import { UIManager } from "./ui/UIManager";
import { BetCommand } from "./command/bet/BetCommand";
import { SpinCommand } from "./command/spin/SpinCommand";

const initialBalance = 1000;
const player = new Player(initialBalance);

const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"];
const reels: Reel[] = [];
const reelsCount = 3;
for (let i = 0; i < reelsCount; i++)
{
  reels.push(new Reel(symbols, i));
}

const slotMachine = new SlotMachine(reels);
const uiController = new UIController();
const betManager = new BetManager(player);
const uiManager = new UIManager(uiController);
const slotMachineManager = new SlotMachineManager(slotMachine);
const spinCommand = new SpinCommand(betManager, slotMachineManager, uiManager);
const betCommand = new BetCommand(betManager, uiManager);
const _mediator = new GameMediator(spinCommand, betCommand, player, uiController);

const playerObserver = new PlayerObserver(uiController);
player.addObserver(playerObserver);

function gameLoop()
{
    requestAnimationFrame(gameLoop);
}

gameLoop();
