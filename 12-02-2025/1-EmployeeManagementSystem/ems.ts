interface Employee1 {
    id:number;
    name:string;
    position:string;
    salaryy:number;
}

interface Manager extends Employee1{
    teamSize : number;
}

class Department {
    private employees : Employee1[] = [];
    
    constructor(employees : Employee1[]){
        this.employees = employees;
    }

    addEmployee(employee : Employee1){
        this.employees.push(employee);
    };

    removeEmployee(id: number){
        this.employees = this.employees.filter((emp)=>emp.id !== id);
    };

    getTotalSalary() : number {
        let totalSalary:number = 0;
        for (const element of this.employees) {
            totalSalary += element.salaryy;
        }
        return totalSalary;
    };

    listEmployees() {
        for (const element of this.employees) {
            console.log(element);
        }
    };
}

function updateSalary<T extends Employee1>(employee:T, newSalary:number) : T {
    dept1.removeEmployee(employee.id);
    dept1.addEmployee({...employee, salaryy:newSalary})
    return {...employee, salaryy:newSalary};
};


const emp1 : Employee1 = {
    id:1,
    name:"Amar",
    position:"Trainee",
    salaryy:25000
};

const emp2 : Employee1 = {
    id:2,
    name:"Akbar",
    position:"Engineer",
    salaryy:40000
};

const emp3 : Employee1 ={
    id : 3,
    name:"Anthony",
    position : "Engineer",
    salaryy:40000
}

const dept1 = new Department([emp1,emp2,emp3]);

dept1.listEmployees();

console.log(`total salary of all employees : ${dept1.getTotalSalary()}`);

dept1.addEmployee({
    id:4,
    name:"Bulbul",
    position:"Trainee",
    salaryy:25000
});

console.log("\nnew emp4 added")
dept1.listEmployees();
console.log(`total salary of all employees : ${dept1.getTotalSalary()}`);

dept1.removeEmployee(4);
console.log("\nemp 4 removed");
dept1.listEmployees();
console.log(`total salary of all employees : ${dept1.getTotalSalary()}`);

console.log("\n updating salary of emp1");
updateSalary(emp1,30000);
dept1.listEmployees();
console.log(`total salary of all employees : ${dept1.getTotalSalary()}`);

/* 
OUTPUT:
{ id: 1, name: 'Amar', position: 'Trainee', salaryy: 25000 }
{ id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 }
{ id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 }
total salary of all employees : 105000

new emp4 added
{ id: 1, name: 'Amar', position: 'Trainee', salaryy: 25000 }
{ id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 }
{ id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 }
{ id: 4, name: 'Bulbul', position: 'Trainee', salaryy: 25000 }
total salary of all employees : 130000

emp 4 removed
{ id: 1, name: 'Amar', position: 'Trainee', salaryy: 25000 }
{ id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 }
{ id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 }
total salary of all employees : 105000

 updating salary of emp1
{ id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 }
{ id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 }
{ id: 1, name: 'Amar', position: 'Trainee', salaryy: 30000 }
total salary of all employees : 110000

*/


console.log("\n-----------------------------------------------------------------------------")
class GenericStorage<T extends Employee1> {
    store: T[] = [];
    
    constructor(store: T[]){
        this.store = store;
    };

    add(item: T){
        this.store.push(item);
    };

    remove(id: number){
        this.store = this.store.filter((e)=>e.id !== id);
    };

    getAll() : T[]{
        return this.store;
    };
}

const dept2 = new GenericStorage<Employee1>([emp1,emp2,emp3]);
const emp5 : Employee1 = {
    id:5,
    name:"Suresh",
    position:"Engineer",
    salaryy:45000
}

console.log("from generic store - employees : ");
console.log(dept2.getAll());

console.log("\nadding new emp in the store");
dept2.add(emp5);
console.log("from updated generic store - employees : ");
console.log(dept2.getAll());

console.log("\nremoving emp5");
dept2.remove(5);
console.log("from updated generic store - employees : ");
console.log(dept2.getAll());

/*
OUTPUT:
-----------------------------------------------------------------------------
from generic store - employees :
[
  { id: 1, name: 'Amar', position: 'Trainee', salaryy: 25000 },
  { id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 },
  { id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 }
]

adding new emp in the store
from updated generic store - employees :
[
  { id: 1, name: 'Amar', position: 'Trainee', salaryy: 25000 },
  { id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 },
  { id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 },
  { id: 5, name: 'Suresh', position: 'Engineer', salaryy: 45000 }
]

removing emp5
from updated generic store - employees :
[
  { id: 1, name: 'Amar', position: 'Trainee', salaryy: 25000 },
  { id: 2, name: 'Akbar', position: 'Engineer', salaryy: 40000 },
  { id: 3, name: 'Anthony', position: 'Engineer', salaryy: 40000 }
]
*/