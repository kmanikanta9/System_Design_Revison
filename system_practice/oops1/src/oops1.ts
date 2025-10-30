
class Student{
    name:string;
    age:number;
    rollNo:number;
    constructor(name:string,age:number,rollNo:number){
        this.name=name;
        this.age=age;
        this.rollNo=rollNo;
    }
    displayDetails(){
        console.log(`Name: ${this.name}, Age: ${this.age}, Roll No: ${this.rollNo}`);
    }
}

let student1 = new Student("Alice",20,101);
student1.displayDetails(); // Output: Name: Alice, Age: 20, Roll No: 101

let student2 = new Student("Bob",22,102);
student2.displayDetails(); // Output: Name: Bob, Age: 22, Roll No: 102


class Vehicle{
    brand:string;
    speed:number;
    constructor(brand:string,speed:number){
        this.brand=brand;
        this.speed=speed;

    }
    drive(){
        console.log('Driving at speed',this.speed)
    }
}

class Car extends Vehicle{
    fuelType:string;
    constructor(brand:string,speed:number,fuelType:string){
        super(brand,speed)
        this.fuelType=fuelType
    }
    reFuel(){
        console.log(this.fuelType)
    }
}

let car1 = new Car('tata',120,'petrol')
car1.drive()
car1.reFuel()


   
interface Printable {
  print(): void;
}

class Document implements Printable {
    print(): void {
        console.log("Printing Document...")
    }
}
class Photo implements Printable {
    print(): void {
        console.log("Printing Photo...")
    }
}

let printable : Printable[] = []

let document = new Document()
let photo = new Photo()

printable.push(document)
printable.push(photo)

printable.forEach((ele)=>ele.print())
// Output : 
// Printing Document...
// Printing Photo...


   
class Person {
  walk(): void {
    console.log("Walk Class");
  }
}

interface Coder {
  code() : void ;
}

class Developer extends Person implements Coder {
  walk(): void { 
    console.log("Walking");
  }
  code(): void {
    console.log("Coding");
  }
}

let developer = new Developer();
developer.code(); // Coding
developer.walk(); // Walking


class Duck{
  swim(){
    console.log('I know swimming')
  }
}

class MallardDuck extends Duck{

}

let duck = new MallardDuck()
duck.swim()

class Bird{
  fly(){
    console.log('I can fly')
  }
}

class Penguin extends Bird{
  fly(): void {
    console.log('I cannot fly')
  }
}

let bird = new Bird()
bird.fly()
let peg = new Penguin()
peg.fly()


interface IDuck{
  swim():void;
  fly():void;
  sound():void;
}

class ToyDuck implements IDuck{
  swim(): void {
    console.log("can float on water");
  }
  fly(): void {
    console.log("cannot fly");
  }
  sound(): void {
    console.log("cannot sound");
  }

}

let toy = new ToyDuck()
toy.fly()
toy.sound()
toy.swim()

class PolyDuck{
  fly(){
    console.log('I can fly')
  }
}
class ChildDuck1 extends PolyDuck{
  fly(): void {
    console.log('childDuck1 can fly')
  }
}
class ChildDuck2 extends PolyDuck{
  fly(): void {
    console.log('childduck2 can fly')
  }
}

const polyduck = new PolyDuck()
const childDuck1 = new ChildDuck1()
const childDuck2 = new ChildDuck2()

function makeDuckFly (polyduck:PolyDuck){
  polyduck.fly()
}
makeDuckFly(polyduck)
makeDuckFly(childDuck1)
makeDuckFly(childDuck2)