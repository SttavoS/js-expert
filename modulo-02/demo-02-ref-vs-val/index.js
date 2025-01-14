let counter = 0;
let counter2 = counter;
counter2++;

console.log(counter); // 0
console.log(counter2); // 1

console.log("-------------------");

const item = { counter: 0 };
const item2 = item;
item2.counter++;

console.log(item.counter); // 1
console.log(item2.counter); // 1
