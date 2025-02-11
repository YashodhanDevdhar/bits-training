// ## Online Payment System

// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.

class Payment{
    public balance:number;
    constructor(balance:number){
        this.balance= balance;
    }
    processPayment(action:string,amount:number, date: Date = new Date()){
        console.log("Call the process Payment method from the subclass!!!");
    }
}

class CreditCartPayment extends Payment{
    private cardNumber : (string|number);
    
    constructor(balance:number, cardNumber:(string|number)){
        super(balance);
        this.cardNumber = cardNumber;
    }

    set Balance(newBalance:number){
        this.balance = newBalance;
    }

    get Balance():number{
        return this.balance;
    }
    processPayment(action:string, amount:number, date: Date = new Date()): void {
        amount = amount;
        date = date;
        if(action==="deposit"){
            console.log(`Credit Card payment is being processed for amount : ${amount} on ${date}`)
            let newBalance : number = this.balance + amount;
            this.Balance = newBalance;
            console.log(`new balance : ${this.Balance}`);
        }else if(action==="withdraw"){
            console.log(`Credit Card payment is being processed for amount : ${amount} on ${date}`)
            let newBalance : number = this.balance - amount;
            this.Balance = newBalance;
            console.log(`new balance : ${this.Balance}`);
        }else{
            console.log("choose correct action between 'deposit' and 'withdraw' ");
        }
    }
}


class PayPalPayment extends Payment{
    private email : string;
    constructor(balance:number, email:string){
        super(balance);
        this.email = email;
    }
    set Balance(newBalance:number){
        this.balance = newBalance;
    }

    get Balance():number{
        return this.balance;
    }

    processPayment(action:string, amount:number, date: Date = new Date()): void {
        amount = amount;
        date = date;
        if(action==="deposit"){
            console.log(`PayPal deposit payment is being processed for amount : ${amount} on ${date}`)
            let newBalance : number = this.balance + amount;
            this.Balance = newBalance;
            console.log(`new balance : ${this.Balance}`);
        }else if(action==="withdraw"){
            console.log(`PayPal withdrawal payment is being processed for amount : ${amount} on ${date}`)
            let newBalance : number = this.balance - amount;
            this.Balance = newBalance;
            console.log(`new balance : ${this.Balance}`);
        }else{
            console.log("choose correct action between 'deposit' and 'withdraw' ");
        }
    }
}

class CryptoPayment extends Payment{
    private walletaddress : string;
    constructor(balance:number, walletAddress:string){
        super(balance);
        this.walletaddress = walletAddress;
    }
    set Balance(newBalance:number){
        this.balance = newBalance;
    }

    get Balance():number{
        return this.balance;
    }

    processPayment(action:string, amount:number, date: Date = new Date()): void {
        amount = amount;
        date = date;
        if(action==="deposit"){
            console.log(`Crypto deposit payment is being processed for amount : ${amount} on ${date}`)
            let newBalance : number = this.balance + amount;
            this.Balance = newBalance;
            console.log(`new balance : ${this.Balance}`);
        }else if(action==="withdraw"){
            console.log(`Crypto withdrawal payment is being processed for amount : ${amount} on ${date}`)
            let newBalance : number = this.balance - amount;
            this.Balance = newBalance;
            console.log(`new balance : ${this.Balance}`);
        }else{
            console.log("choose correct action between 'deposit' and 'withdraw' ");
        }
    }
}

let p1 = new CreditCartPayment(50000,"sbi12345");
p1.processPayment("deposit",10000,new Date("2025-02-11"));
p1.processPayment("withdraw",20000,new Date("2025-02-11"));
console.log("\n")
let p2 = new PayPalPayment(80000,"yashodhan@mail.com");
p2.processPayment("deposit",10000,new Date("2025-02-11"));
p2.processPayment("withdraw",20000,new Date("2025-02-11"));
console.log("\n")
let p3 = new PayPalPayment(50000,"ypd12345");
p3.processPayment("deposit",10000,new Date("2025-02-11"));
p3.processPayment("withdraw",20000,new Date("2025-02-11"));

/*
OUTPUT:

Credit Card payment is being processed for amount : 10000 on Tue Feb 11 2025 05:30:00 GMT+0530 (India Standard Time)
new balance : 60000
Credit Card payment is being processed for amount : 20000 on Tue Feb 11 2025 05:30:00 GMT+0530 (India Standard Time)
new balance : 40000


PayPal deposit payment is being processed for amount : 10000 on Tue Feb 11 2025 05:30:00 GMT+0530 (India Standard Time)
new balance : 90000
PayPal withdrawal payment is being processed for amount : 20000 on Tue Feb 11 2025 05:30:00 GMT+0530 (India Standard Time)
new balance : 70000


PayPal deposit payment is being processed for amount : 10000 on Tue Feb 11 2025 05:30:00 GMT+0530 (India Standard Time)
new balance : 60000
PayPal withdrawal payment is being processed for amount : 20000 on Tue Feb 11 2025 05:30:00 GMT+0530 (India Standard Time)
new balance : 40000

*/