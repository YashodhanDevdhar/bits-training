// ## Vehicle Rental System

// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

class Vehicle{
    public brand : string;
    public model : string;

    constructor(brand:string, model:string){
        this.brand = brand;
        this.model = model;
    }

    rentPricePerDay() : number{
        return 500;
    }
}

class Bike extends Vehicle{
    constructor(brand:string, model:string){
        super(brand,model);
    };

    rentPricePerDay(): number {
        return 750;
    }
}
class Car extends Vehicle{
    constructor(brand:string, model:string){
        super(brand,model);
    };
    rentPricePerDay(): number {
        return 1500;
    }
}

class Truck extends Vehicle{
    constructor(brand:string, model:string){
        super(brand,model);
    };
    rentPricePerDay(): number {
        return 2500;
    }
}

let b1 = new Bike("Honda","Activa 6G");
console.log("Bike : ",b1);
console.log("Rent : ",b1.rentPricePerDay())

let c1 = new Car("Maruti","Wagon R");
console.log("\nCar : ",c1);
console.log("Rent : ",c1.rentPricePerDay())

let t1 = new Truck("Mahindra","Pickup");
console.log("\nTruck : ",t1);
console.log("Rent : ",t1.rentPricePerDay())


/*
OUTPUT:

Bike :  Bike { brand: 'Honda', model: 'Activa 6G' }
Rent :  750

Car :  Car { brand: 'Maruti', model: 'Wagon R' }
Rent :  1500

Truck :  Truck { brand: 'Mahindra', model: 'Pickup' }
Rent :  2500

*/