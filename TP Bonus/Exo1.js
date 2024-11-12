// -------------   1

console.log("Quest 1 :");

let v1 = 10,
  v2 = 25;

console.log("value of v1 :", v1, "value of v2 :", v2);
[v1, v2] = [v2, v1];

console.log("value of v1 :", v1, "value of v2 :", v2);

// -------------   2

console.log("Quest 2 :");

const numbers = [1, 2, 3];
const letters = ["a", "b", "c"];
const foods = ["mango", "pecan pie"];

const singleArr = [...numbers, ...letters, ...foods];
console.log("single Array : ", singleArr);

// --------------   3
console.log("Quest 3 :");

let a = "oussama";
let b = [...a];
console.log(b);

//---------------    4

console.log("case a , Args contains : [3,'A','B','C']");
console.log("case b , Args contains : ");
console.log("case c , Args contains : c,d");
