console.assert(String(123) === "123", "explicit conversion to string");
console.assert(123 + "" === "123", "implicit conversion to string");

console.assert(("hello" || 123) === "hello", "|| returns first trutly value");
console.assert(("hello" && 123) === 123, "&& returns last trutly value");

// ----------------------------------------------
const people = {
  name: "Gustavo Schneider",
  age: 26,
  // string: primeiro se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name} | Age: ${this.age}`;
  },
  // number: primeiro se não for primitivo, chama o toString
  valueOf() {
    return 7;
  },
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: this.valueOf(),
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString()", String(people));
//
// vai retornar NaN pois o toString retornou a string
// console.log("valueOf()", Number(people));

// console.log("String coercion", String(people));
// console.log("Number coercion", Number(people));
// console.log("Date coercion", new Date(people));

console.assert(
  people + 0 === '{"name":"Gustavo Schneider","age":26}0',
  "toPrimitive: conversion to number",
);
// console.log("!!people is true?", !!people);
console.assert(!!people);

// console.log("string.concat", "Ae".concat(people));
console.assert(
  "Ae".concat(people) === "Ae{" + '"name":"Gustavo Schneider","age":26}',
  "concat",
);
