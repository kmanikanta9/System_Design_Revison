"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log("hello", this.name);
    }
}
let user1 = new User("mani", 10);
console.log(user1);
user1.greet();
let name = "Masai";
let age = 10;
let isActive = true;
let scores = [90, 85, 70];
let user = {
    id: 1,
    name: "Alice",
};
console.log(user);
class Duck {
    swim() {
        console.log("I know swimming");
    }
    sound() {
        console.log("Quack");
    }
    fly() {
        console.log("I fly at 10 kmph");
    }
}
class IndianDuck extends Duck {
    fly() {
        console.log("I fly at 5 kmph");
    }
}
let indianDuck = new IndianDuck();
indianDuck.swim();
indianDuck.fly();
//# sourceMappingURL=index.js.map