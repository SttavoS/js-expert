import assert from "node:assert";
import { readFile, stat, readdir } from "node:fs/promises";

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
  yield ",";
  yield "World";
  yield "!";
  yield* calculation(20, 10);
}

const generator = main();
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: ",", done: false });
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: "World", done: false });
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: "!", done: false });
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
// console.log(generator.next())
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log(Array.from(main()))
assert.deepStrictEqual(Array.from(main()), ["Hello", ",", "World", "!", 200]);
// console.log([...main()])
assert.deepStrictEqual([...main()], ["Hello", ",", "World", "!", 200]);

// Async Iterators
function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey Dude");
}

async function* systemInfo() {
  const file = await readFile(import.meta.filename);
  yield { file: file.toString() };

  const { size } = await stat(import.meta.filename);
  yield { size };

  const dir = await readdir(import.meta.dirname);
  yield { dir };
}

// Promise.all([...promisified()]).then(results => console.log('promisified', results))
// ;(async () => {
//     for await (const item of promisified()) {
//         console.log('for await', item.toString())
//     }
// })()
(async () => {
  for await (const item of systemInfo()) {
    console.log("systemInfo", item);
  }
})();
