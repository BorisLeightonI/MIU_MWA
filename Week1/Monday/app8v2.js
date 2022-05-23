const fibo = require("./fibonacci");


console.log("1: Start");
setTimeout(()=>{
    console.log(`Fibonacci coefficient of 42 is: ${fibo(42)}`);
}, 3000)
console.log("2: End");