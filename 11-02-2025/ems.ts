// ## Employee Management System

// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.

class Employee {
    public name : string;
    public id : number;
    private salary : number;
    
    constructor(name : string, id:number, salary : number){
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    get Salary() : number{
        return this.salary;
    }

    calculateBonus() : number{
        return this.salary * 0.05;
    };
}

class Manager extends Employee{
    constructor(name:string, id:number, salary:number){
        super(name,id,salary);
    }

    calculateBonus(): number {
        return this.Salary * 0.2;
    }
}

class Engineer extends Employee{
    constructor(name:string, id:number, salary:number){
        super(name,id,salary);
    }

    calculateBonus(): number {
        return this.Salary * 0.1;
    }
}

class Intern extends Employee{
    constructor(name:string, id:number, salary:number){
        super(name,id,salary);
    }

    calculateBonus(): number {
        return this.Salary * 0;
    }
}

let m1 = new Manager("Yashodhan",123,60000);
let totalSalaryM1 : number = m1.Salary + m1.calculateBonus();

let e1 = new Engineer("Prasad",456,45000);
let totalSalaryE1 : number = e1.Salary + e1.calculateBonus();

let i1 = new Intern("Devdhar", 789, 25000);
let totalSalaryI1 : number = i1.Salary + i1.calculateBonus();

console.log("Manager : ",m1);
console.log("Total Salary : ",totalSalaryM1);

console.log("\nEngineer : ",e1);
console.log("Total Salary : ",totalSalaryE1);

console.log("\nIntern : ",i1);
console.log("Total Salary : ",totalSalaryI1);

/*
OUTPUT : 

Manager :  Manager { name: 'Yashodhan', id: 123, salary: 60000 }
Total Salary :  72000

Engineer :  Engineer { name: 'Prasad', id: 456, salary: 45000 }
Total Salary :  49500

Intern :  Intern { name: 'Devdhar', id: 789, salary: 25000 }
Total Salary :  25000

*/
