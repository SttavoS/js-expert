import { File } from "./src/file.js";
import { constants } from "./src/constants.js";
import assert from "node:assert/strict";

// IFEE
(async () => {
  // varíaves criadas nesse bloco, só são válidas durante sua execução
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const expected = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/invalid-header.csv";
    const expected = new Error(constants.error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/fiveItems-invalid.csv";
    const expected = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/threeItems-valid.csv";
    const expected = [
      {
        id: 1,
        name: "Xuxa da Silva",
        profession: "developer",
        age: 120,
      },
      {
        id: 2,
        name: "José da Silva",
        profession: "manager",
        age: 30,
      },
      {
        id: 3,
        name: "Zezin",
        profession: "QA",
        age: 25,
      },
    ];
    const result = await File.csvToJSON(filePath);
    assert.deepEqual(result, expected);
  }
})();
