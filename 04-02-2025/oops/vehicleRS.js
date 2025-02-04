// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

class Vehicle {
    constructor(brand, model){
        this.brand = brand;
        this.model = model;
    }
    rentPricePerDay(){
        return 500;
    }
}

class Car extends Vehicle{
    rentPricePerDay(){
        return 1500;
    }
}

class Bike extends Vehicle{
    rentPricePerDay(){
        return 700;
    }
}

class Truck extends Vehicle{
    rentPricePerDay(){
        return 3000;
    }
}

const vehicle = new Vehicle();
const car = new Car("Tata Avinya",101);
const bike = new Bike("Hero Splendor",102);
const truck = new Truck("Tata 407",103);

console.log(`basic per day rent of a vehicle is : ${vehicle.rentPricePerDay()}`);
console.log(`per day rent of car is : ${car.rentPricePerDay()}`);
console.log(`per day rent of bike is : ${bike.rentPricePerDay()}`);
console.log(`per day rent of truck is : ${truck.rentPricePerDay()}`);
