export class CommandManager {
    constructor() {
        this.history = [];
        this.undone = [];
    }
    executeCommand(command, value) {
        command.execute(value);
        this.history.push(command);
        this.undone = [];
    }
    undo() {
        const command = this.history.pop();
        if (command && command.undo) {
            command.undo();
            this.undone.push(command);
        }
    }
    redo() {
        const command = this.undone.pop();
        if (command && command.redo) {
            command.redo();
            this.history.push(command);
        }
    }
}
