"use strict";

import assert from "node:assert";

// O Reflect é usado para garantir semântica e segurança em objetos

// ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// Comentado por questões de segurança
// Function.prototype.apply = () => {
//   throw new TypeError("Eita!");
// };
// assert.throws(
//   () => {
//     myObj.add.apply({}, []);
//   },
//   { name: "TypeError", message: "Eita!" },
// );

myObj.add.apply = function () {
  throw new Error("Vixxx");
};
assert.throws(
  () => {
    myObj.add.apply({ arg1: 10, arg2: 20 }, [100]);
  },
  { name: "Error", message: "Vixxx" },
);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!')}

// esse aqui pode acontecer!
myObj.add.apply = function () {
  throw new TypeError("Vixxx");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Vixxx",
});

// usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);
// ---- apply

// --- defineProperty

// questoes semanticas
function MyDate() {}

// feio pra Kct, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });
console.log("MyDate.withObject()", MyDate.withObject());
assert.deepStrictEqual(MyDate.withObject(), "Hey there");

// agora faz mais sentido
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude" });
console.log("MyDate.withReflection()", MyDate.withReflection());
assert.deepStrictEqual(MyDate.withReflection(), "Hey dude");

// --- deleteProperty
const withDelete = { user: "ErickWendel" };
// imperformático, evitar ao máximo
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const withReflection = { user: "XuxaDaSilva" };
Reflect.deleteProperty(withReflection, "user");
assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false);
// --delete Property

//  ---- get
// Deveriamos fazer um get somente em instâncias de referência
assert.deepStrictEqual((1)["userName"], undefined);
// com reflection, uma exceçao é lançada!
assert.throws(() => Reflect.get(1, "userName"), TypeError);
//  ---- get

//  --- has
assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));
//  --- has

// --- ownKeys
const user = Symbol("user");
const databaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "erickwendel",
};

// Com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];
assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);

// com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  "id",
  Symbol.for("password"),
  user,
]);
// --- ownKeys
