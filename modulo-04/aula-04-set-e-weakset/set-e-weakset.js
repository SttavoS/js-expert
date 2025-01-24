import assert from "node:assert";

// usado na maioria das vezes para Listas de itens unicos
const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);
console.log("arr3", arr3.sort());
assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

console.log("Set with add item per item", set);
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);
// rest/spread
console.log("Set from spread...", Array.from(new Set([...arr1, ...arr2])));
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);

console.log("---------------------------------------------------------------");
console.log("set.keys", set.keys());
console.log("set.values", set.values()); // só existe por conta do Map

console.log("---------------------------------------------------------------");

// no Array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
console.log("set.has()", set.has("3"));
assert.ok(set.has("3"));

console.log("---------------------------------------------------------------");
// mesma teoria do Map, mas você sempre trabalha com a lista toda não tem get,
// então você pode saber se o item está ou nao no array e é isso.
// Na documentação tem exemplos sobre como fazer uma interceçao, saber o que
// tem em uma lista e não tem na outra e assim por diante

// tem nos dois arrays
const users01 = new Set(["Gustavo", "Mariazinha", "Xuxa da Silva"]);
const users02 = new Set(["Joãozinho", "Gustavo", "Julio"]);
console.log("users01", users01);
console.log("users02", users02);

const intersection = new Set([...users01].filter((user) => users02.has(user)));
console.log("intersection", intersection);
assert.deepStrictEqual(Array.from(intersection), ["Gustavo"]);

const difference = new Set([...users01].filter((user) => !users02.has(user)));
console.log("difference", difference);
assert.deepStrictEqual(Array.from(difference), ["Mariazinha", "Xuxa da Silva"]);

console.log("---------------------------------------------------------------");
// weakSet

// mesma ideia do WeakMap
// nao é enumerável (iterável)
// só trabalha com chaves como referencia
// só tem metodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
console.log("weakSet.has(user)", weakSet.has(user));
assert.deepStrictEqual(weakSet.has(user), true);

weakSet.add(user2);
console.log("weakSet.has(user2)", weakSet.has(user));
assert.deepStrictEqual(weakSet.has(user), true);

weakSet.delete(user);
console.log("weakSet.has(user) after delete", weakSet.has(user));
assert.deepStrictEqual(weakSet.has(user), false);
