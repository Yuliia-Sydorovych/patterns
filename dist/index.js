import { Player } from "./observer/Player.js";
import { Reel } from "./reels/Reel.js";
import { GameMediator } from "./mediator/GameMediator.js";
import { PlayerObserver } from "./observer/PlayerObserver.js";
import { SlotMachine } from "./reels/SlotMachine.js";
import { UIController } from "./ui/UIController.js";
import { BetManager } from "./command/bet/BetManager.js";
import { SlotMachineManager } from "./reels/SlotMachineManager.js";
import { UIManager } from "./ui/UIManager.js";
import { BetCommand } from "./command/bet/BetCommand.js";
import { SpinCommand } from "./command/spin/SpinCommand.js";
import { EventDispatcher } from "./event/EventDispatcher.js";
import { CommandManager } from "./command/CommandManager.js";
const initialBalance = 1000;
const player = new Player(initialBalance);
const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"];
const reels = [];
const reelsCount = 3;
for (let i = 0; i < reelsCount; i++) {
    reels.push(new Reel(symbols, i));
}
const slotMachine = new SlotMachine(reels);
const dispatcher = new EventDispatcher();
const uiController = new UIController(dispatcher);
const betManager = new BetManager(player);
const uiManager = new UIManager(uiController);
const slotMachineManager = new SlotMachineManager(slotMachine);
const spinCommand = new SpinCommand(betManager, slotMachineManager, uiManager);
const betCommand = new BetCommand(betManager, uiManager);
const commandManager = new CommandManager();
const _mediator = new GameMediator(spinCommand, betCommand, player, uiController, commandManager);
const playerObserver = new PlayerObserver(dispatcher);
player.addObserver(playerObserver);
function gameLoop() {
    requestAnimationFrame(gameLoop);
}
gameLoop();
