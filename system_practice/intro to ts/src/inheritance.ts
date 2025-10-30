class Duck{
    name:string;
    interest:string;
    constructor(name:string,interest:string){
        this.name=name;
        this.interest= interest;
    }

    swim(){
        return `${this.name} is swimming`;
    }

    performFly(){
        return `${this.name} is flying`;
    }

    makeSound(){
        return `${this.name} says Quack Quack`;
    }

    quack(){
        return `${this.name} is quacking`;
    }
}

class MallardDuck extends Duck{
    constructor(name:string,interest:string){
        super(name,interest)
    }
    makeSound(): string {
        return `${this.name} says Quack Quack in a loud voice`;
    }

    fly(): string {
        return `${this.name} is flying at 20 kmph`;
    }
}

let mallardDuck = new MallardDuck("Mallard","Swimming");
console.log(mallardDuck.swim());         // Output: Mallard is swimming!
console.log(mallardDuck.performFly());  // Output: Mallard is flying!
console.log(mallardDuck.makeSound());   // Output: Mallard is quacking loudly!
console.log(mallardDuck.quack());       // Output: Mallard is quacking loudly!
console.log(mallardDuck.fly());