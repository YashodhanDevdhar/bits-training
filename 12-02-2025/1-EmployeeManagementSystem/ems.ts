interface Employee {
    id:number;
    name:string;
    position:string;
    salaryy:number;
}

interface Manager extends Employee{
    teamSize : number;
}

class Department {
    private employees : Employee[] = [];
    
    constructor(employees : Employee[]){
        this.employees = employees;
    }

    addEmployee(employee : Employee){
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

function updateSalary<T extends Employee>(employee:T, newSalary:number) : T {
    dept1.removeEmployee(employee.id);
    dept1.addEmployee({...employee, salaryy:newSalary})
    return {...employee, salaryy:newSalary};
};


const emp1 : Employee = {
    id:1,
    name:"Amar",
    position:"Trainee",
    salaryy:25000
};

const emp2 : Employee = {
    id:2,
    name:"Akbar",
    position:"Engineer",
    salaryy:40000
};

const emp3 : Employee ={
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

// class GenericStorage<T> {
//     store: T[] = [];
    
//     constructor(store: T[]){
//         this.store = store;
//     };

//     add(item: T){
//         this.store.push(item);
//     };

//     remove(item: T){
//         const index = this.store.findIndex((i) => {JSON.stringify(i) === JSON.stringify(item)});
//         if(index !== -1){
//             this.store.splice(index,1);
//         }
//     };

//     getAll() : T[]{
//         return this.store;
//     };
// }