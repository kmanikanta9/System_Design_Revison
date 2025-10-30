const employees = [
  { name: "Amit", dept: "Tech", salary: 70000, rating: 4.8 },
  { name: "Neha", dept: "Tech", salary: 60000, rating: 4.2 },
  { name: "Ravi", dept: "HR", salary: 55000, rating: 4.7 },
  { name: "Sonia", dept: "Tech", salary: 75000, rating: 4.9 },
  { name: "Karan", dept: "Finance", salary: 50000, rating: 3.9 },
];


let fil = employees.filter(ele => ele.dept=='Tech')
.filter(ele=>ele.rating>4.5)
.sort((a,b)=>b.salary-a.salary)
let names = fil.map(ele=>ele.name)

console.log(names);
let total = fil.reduce((acc,cur)=>acc+cur.salary,0)
console.log(`Total Salary: ${total}`)

