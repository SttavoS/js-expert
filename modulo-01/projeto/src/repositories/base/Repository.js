import { readFile } from "node:fs/promises";

class Repository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = JSON.parse(await readFile(this.file));
    if (!itemId) return content;

    return content.find(({ id }) => id === itemId);
  }
}

export default Repository;
