import assert from "node:assert";

const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, "one")
  .set("Gustavo", { text: "Schneider" })
  .set(true, () => "hello");

// usando um construtor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

console.log("myMap", myMap);
console.log("myMapWithConstructor", myMapWithConstructor);
console.log("myMap.get(1)", myMap.get(1));
assert.deepStrictEqual(myMap.get(1), "one");
console.log("myMap.get('Gustavo')", myMap.get("Gustavo"));
assert.deepStrictEqual(myMap.get("Gustavo"), { text: "Schneider" });
console.log("myMap.get(true)()", myMap.get(true)());
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyRefenceWorks = { id: 1 };
myMap.set(onlyRefenceWorks, { name: "GustavoSchneider" });

console.log("myMap.get({ id: 1 })", myMap.get({ id: 1 }));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
console.log("myMap.get(onlyRefenceWorks)", myMap.get(onlyRefenceWorks));
assert.deepStrictEqual(myMap.get(onlyRefenceWorks), {
  name: "GustavoSchneider",
});

console.log("---------------------------------------------------------------");

// utilitarios
// - No Object seria Object.keys({a: 1}).length
console.log("Object.keys().length", Object.keys({ a: 1 }).length);
assert.deepStrictEqual(Object.keys({ a: 1 }).length, 1);
console.log("Map.size", myMap.size);
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coerçao implícita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Erick' }).hasOwnProperty('name')
console.log("Map.has()", myMap.has(onlyRefenceWorks));
assert.ok(myMap.has(onlyRefenceWorks));

// para remover um item do objeto
// delete item.id
// imperformático para o Javascript
assert.ok(myMap.delete(onlyRefenceWorks));

// Nao dá para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
console.log(JSON.stringify([...myMap]));
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Gustavo", { text: "Schneider" }],
    [true, () => { }],
  ]),
);

for (const [key, value] of myMap) {
  console.log({ key, value });
}

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey' }).toString()  === 'Hey'

// qualquer chave pode colidir, com as propriedades heradas do objecto, como
// constructor, toString, valueOf e etc.

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Sulva",
};

// nao tem restricao de nome de chave
myMap.set(actor);

console.log("myMap.has(actor)", myMap.has(actor));
assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Nao da para limpar um Obj sem reassina-lo
myMap.clear();
console.log("Map.clear()", myMap.clear());
assert.deepStrictEqual([...myMap.keys()], []);

console.log("-----------------------WeakMap---------------------------------");
// Pode ser coletado após perder as referencias
// usado em casos beeem específicos

// tem a maioria dos beneficos do Map
// MAS: nao é iterável
// Só chaves de referencia e que você já conheça mais leve e preve leak de
// memória, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: "Flash" };

console.log("wearkMap", weakMap);
weakMap.set(hero, hero.name);
console.log("wearkMap.get()", weakMap.get(hero));
assert.deepStrictEqual(weakMap.get(hero), "Flash");
weakMap.delete(hero);
console.log("WeakMap.has()", weakMap.has(hero));
assert.deepStrictEqual(weakMap.has(hero), false);
