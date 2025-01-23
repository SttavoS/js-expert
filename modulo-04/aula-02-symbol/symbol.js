import assert from "node:assert";
import { isSymbol } from "node:util";

const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for a normal Object";
user[uniqueKey] = "value for Symbol";

console.log("getting normal Objects", user.userName);
assert.deepStrictEqual(user.userName, "value for a normal Object");
console.log("getting Symbol objects", user[Symbol["userName"]]);
assert.deepStrictEqual(user[Symbol("userName")], undefined);
console.log("getting Symbol objects", user[uniqueKey]);
assert.deepStrictEqual(user[uniqueKey], "value for Symbol");

console.log("symbols", Object.getOwnPropertySymbols(user)[0]);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

console.log("----------------------------------------------");
// byPass - má prática (não  utilizado na codebase do node)
user[Symbol.for("password")] = 123;
console.log("byPass Symbol", user[Symbol.for("password")]);
assert.deepStrictEqual(user[Symbol.for("password")], 123);

console.log("----------------------------------------------");
// Well Known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo e retorna
        value: this.items.pop(),
      };
    },
  }),
};

for (const item of obj) {
  console.log("item", item);
}

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

console.log("----------------------------------------------");

const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  // Faz a coerção de tipos
  [Symbol.toPrimitive](coercionType) {
    // Lança uma excessão para qualquer coerção que não seja string
    // Por que convenhamos, não faz sentido somar um objeto com um inteiro
    if (coercionType !== "string") throw new TypeError();

    // Apenas uma coerção normal, transformando uma lista de data e uma string
    // usando a biblioteca Intl
    const itens = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item),
    );

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(itens);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  // Permite alterar a saída quando se tenta mostrar um objeto como string
  // o default [object Object], esse método permite alterar o "Object"
  // Importante: sem o 'get', não funciona
  get [Symbol.toStringTag]() {
    return "WHAT?";
  }
}

const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);

const expectedDates = [new Date(2020, 3, 1), new Date(2018, 2, 2)];

// Execução do get [Symbol.toStringtag]()
console.log("Symbol.toStringTag", Object.prototype.toString.call(myDate));
assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object WHAT?]",
);

// Lança uma excessão ao tentar fazer uma soma de um inteiro com um objeto
assert.throws(() => myDate + 1, TypeError);

// Coercao explícita para chamar o toPrimitive
console.log("String Coersion", String(myDate));
assert.deepStrictEqual(
  String(myDate),
  "01 de abril de 2020 e 02 de março de 2018",
);

// implementar o iterator!
console.log("Symbol Iterator", [...myDate]);
assert.deepStrictEqual([...myDate], expectedDates);

// Async Iterators
(async () => {
  for await (const item of myDate) {
    console.log("asyncIterator", item);
  }
})();
(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();
