"use strict";

x = 3.14; // ReferenceError: x is not defined
x = { p1: 10, p2: 20 };

console.log(x); // 3.14

const y = 3.14;
function z(p1, p2) {}

// Syntax Error: Delete of an unqualified identifier in strict mode.
delete z;
delete y;

// SyntaxError: Duplicate parameter name not allowed in this context
function x(p1, p1) {}

// TypeError: Cannot assign to read only property 'x' of object '#<Object>'
let obj = {};
Object.defineProperty(obj, "x", { value: 0, writable: false });

obj.x = 3.14;
console.log(obj.x); // 0
