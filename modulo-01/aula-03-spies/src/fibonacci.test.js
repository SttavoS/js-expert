import assert from "node:assert/strict";
import { createSandbox } from "sinon";
import { Fibonacci } from "./fibonacci.js";

const sinon = createSandbox();

/*
 * Fibonacci: o próximo número da sequência é sempre a soma dos anteriores
 * input: 3
 * 0,1,1
 * input: 5
 * 0,1,1,2,3
 **/
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // Número de sequências: 5
    // [0] input = 5, current = 0, next = 1, result = 0
    // [1] input = 4, current = 1, next = 1, result = 1
    // [2] input = 3, current = 1, next = 2, result = 1
    // [3] input = 2, current = 2, next = 3, result = 2
    // [4] input = 1, current = 3, next = 5, result = 3
    // [5] input = 0, current = 5, next = 8 -> PARA
    for (const sequence of fibonacci.execute(5)) {
    }
    const expectedCallCount = 6;
    assert.strictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // Número de sequências: 5
    // [0] input = 3, current = 0, next = 1, result = 0
    // [1] input = 2, current = 1, next = 1, result = 1
    // [2] input = 1, current = 1, next = 2, result = 1
    // [3] input = 0, current = 2, next = 3, result = 2
    for (const sequence of fibonacci.execute(3)) {
    }
    const { args } = spy.getCall(2);
    const expectedParams = [1, 1, 2];
    assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais!");
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // Número de sequências: 5
    // [0] input = 5, current = 0, next = 1, result = 0
    // [1] input = 4, current = 1, next = 1, result = 1
    // [2] input = 3, current = 1, next = 2, result = 1
    // [3] input = 2, current = 2, next = 3, result = 2
    // [4] input = 1, current = 3, next = 5, result = 3
    // [5] input = 0, current = 5, next = 8 -> PARA
    const results = [...fibonacci.execute(5)];
    const expectedResults = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(results, expectedResults);
  }
})();
