//Part1
var arr =[3, 5, 8]
let plus_one = arr.map((n)=>n+1) 

//Part2
function double(arr){
    return arr.map((val)=>val*2)}


//Part3
var obj = {
    numbers: {
    a: 1,
    b: 2
    }
}
let a = obj.numbers.a;
let b = obj.numbers.b;


//Part4
function add(a,b){
    if(a === 0) a = 0
    else {
    a = a || 10
    }
    if(b === 0) b = 0
    else {
    b = b || 10
    }
    return a+b
    }