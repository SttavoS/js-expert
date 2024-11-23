import { readFile } from "node:fs/promises";
import { constants } from "./constants.js";

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

export class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf8");
    const validation = this.isValid(content);
    if (!validation.valid) throw new Error(validation.error);

    const result = this.parseCSVToJSON(content);
    return result;
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeaders] = csvString.split(/\r?\n/);
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: constants.error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    if (
      !fileWithoutHeaders.length ||
      fileWithoutHeaders.length > options.maxLines
    ) {
      return {
        error: constants.error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const users = lines.map((line) => {
      const columns = line.split(",");
      const user = {};
      for (const index in columns) {
        user[header[index]] =
          columns[index] > 0
            ? parseInt(columns[index].trim())
            : columns[index].trim();
      }
      return user;
    });

    return users;
  }
}
