// Question-1


const students = [
  { name: "Alice", marks: 85 },
  { name: "Bob", marks: 92 },
  { name: "Charlie", marks: 70 },
];

let scores = students.filter(num=>num.marks>80)
let total = scores.reduce((acc,cur)=>acc+cur.marks,0)
const average = total/scores.length

console.log(average);


// Question-2

function sorting(people){
    let sorted = people.sort((a,b)=>b.age-a.age)
    console.log(sorted)
    let arr =[]
    for(let i=0;i<=2;i++){
        arr.push(sorted[i].age)
    }
    
    let total = arr.reduce((acc,cur)=>acc+cur,0)
    
    return total
}


const people = [
  { name: "A", age: 21 },
  { name: "B", age: 42 },
  { name: "C", age: 29 },
  { name: "D", age: 36 },
];

console.log(sorting(people));



// Question-3

console.log(a);
var a = 10;
function test() {
  console.log(a);
  var a = 20;
}
test();


// undefined, undefined
// Due to hoisting and variable scoping

