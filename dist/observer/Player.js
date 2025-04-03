export class Player {
    constructor(initialBalance) {
        this.observers = [];
        this.balance = initialBalance;
    }
    updateBalance(amount) {
        this.balance += amount;
        this.notifyObservers();
    }
    placeBet(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.notifyObservers();
            return true;
        }
        return false;
    }
    checkBet(amount) {
        return this.balance >= amount;
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.balance));
    }
}
