"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    name;
    age;
    rollNo;
    constructor(name, age, rollNo) {
        this.name = name;
        this.age = age;
        this.rollNo = rollNo;
    }
    displayDetails() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Roll No: ${this.rollNo}`);
    }
}
let student1 = new Student("Alice", 20, 101);
student1.displayDetails(); // Output: Name: Alice, Age: 20, Roll No: 101
let student2 = new Student("Bob", 22, 102);
student2.displayDetails(); // Output: Name: Bob, Age: 22, Roll No: 102
class Vehicle {
    brand;
    speed;
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    drive() {
        console.log('Driving at speed', this.speed);
    }
}
class Car extends Vehicle {
    fuelType;
    constructor(brand, speed, fuelType) {
        super(brand, speed);
        this.fuelType = fuelType;
    }
    reFuel() {
        console.log(this.fuelType);
    }
}
let car1 = new Car('tata', 120, 'petrol');
car1.drive();
car1.reFuel();
class Document {
    print() {
        console.log("Printing Document...");
    }
}
class Photo {
    print() {
        console.log("Printing Photo...");
    }
}
let printable = [];
let document = new Document();
let photo = new Photo();
printable.push(document);
printable.push(photo);
printable.forEach((ele) => ele.print());
// Output : 
// Printing Document...
// Printing Photo...
class Person {
    walk() {
        console.log("Walk Class");
    }
}
class Developer extends Person {
    walk() {
        console.log("Walking");
    }
    code() {
        console.log("Coding");
    }
}
let developer = new Developer();
developer.code(); // Coding
developer.walk(); // Walking
class Duck {
    swim() {
        console.log('I know swimming');
    }
}
class MallardDuck extends Duck {
}
let duck = new MallardDuck();
duck.swim();
class Bird {
    fly() {
        console.log('I can fly');
    }
}
class Penguin extends Bird {
    fly() {
        console.log('I cannot fly');
    }
}
let bird = new Bird();
bird.fly();
let peg = new Penguin();
peg.fly();
class ToyDuck {
    swim() {
        console.log("can float on water");
    }
    fly() {
        console.log("cannot fly");
    }
    sound() {
        console.log("cannot sound");
    }
}
let toy = new ToyDuck();
toy.fly();
toy.sound();
toy.swim();
class PolyDuck {
    fly() {
        console.log('I can fly');
    }
}
class ChildDuck1 extends PolyDuck {
    fly() {
        console.log('childDuck1 can fly');
    }
}
class ChildDuck2 extends PolyDuck {
    fly() {
        console.log('childduck2 can fly');
    }
}
const polyduck = new PolyDuck();
const childDuck1 = new ChildDuck1();
const childDuck2 = new ChildDuck2();
function makeDuckFly(polyduck) {
    polyduck.fly();
}
makeDuckFly(polyduck);
makeDuckFly(childDuck1);
makeDuckFly(childDuck2);
//# sourceMappingURL=oops1.js.map