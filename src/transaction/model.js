class Transaction {
    constructor(from, to, amount) {
        if (!from || !to || isNaN(amount)) return console.log('Geçersiz veri.');

        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = new Date();
    }
}

module.exports = Transaction;