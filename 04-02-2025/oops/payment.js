// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.

class Payment {
    constructor(amount,date){
        this.amount = amount;
        this.date = date;
    }

    processPayment(){
        throw new Error(`"processPayment()" method should be called from subclasses only!`);
    }
}

class CreditCardPayment extends Payment{
    #cardNumber;
    constructor(amount, date, cardNumber){
        super(amount, date);
        this.#cardNumber = cardNumber;
    }
    processPayment(){
        return `Credit Card payment is being processed for amount : ${this.amount} on ${this.date}`;
    }
}

class PayPalPayment extends Payment{
    #email
    constructor(amount, date, email){
        super(amount, date);
        this.#email = email;
    }
    processPayment(){
        return `PayPal payment is being processed for amount : ${this.amount} on ${this.date}`;
    }
}

class CryptoPayment extends Payment{
    #walletAddress;
    constructor(amount, date, walletAddress){
        super(amount, date);
        this.#walletAddress = walletAddress;
    }
    processPayment(){
        return `Crypto payment is being processed for amount : ${this.amount} on ${this.date}`;
    }
}
const payment = new Payment(10000,"2025-01-01")
const creditPayment = new CreditCardPayment(45000, "2025-02-04", "1234-5678-9012-3456");
const paypalPayment = new PayPalPayment(2000, "2025-01-25", "user@example.com");
const cryptoPayment = new CryptoPayment(2, "2024-08-07", "0xABC123DEF456");


console.log(creditPayment.processPayment());
console.log(paypalPayment.processPayment());
console.log(cryptoPayment.processPayment());

// console.log(payment.processPayment());