// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.

class Employee {
    #salary;
    constructor (name, id, salary){
        this.name = name;
        this.id = id;
        this.#salary = salary;
    };

    getSalary(){
        return this.#salary
    };

    calculateBonus = function(){
        return this.#salary * 0.05;
    }

}

class Manager extends Employee {
    calculateBonus = function(){
        return this.getSalary() * 0.2;
    }
}

class Engineer extends Employee{
    calculateBonus = function(){
        return this.getSalary() * 0.1;
    }
}

class Intern extends Employee{
    calculateBonus = function(){
        return this.getSalary() * 0;
    }
}

const m1 = new Manager("Yashodhan",123,100000);
const totalSalaryM1 = m1.getSalary() + m1.calculateBonus();

const e1 = new Engineer("Yash",223,60000);
const totalSalaryE1 = e1.getSalary() + e1.calculateBonus();

const i1 = new Intern("Ash",323,15000);
const totalSalaryI1 = i1.getSalary() + i1.calculateBonus();

console.log(`total salary of manager is ${totalSalaryM1}`);
console.log(`total salary of engineer is ${totalSalaryE1}`);
console.log(`total salary of intern is ${totalSalaryI1}`);