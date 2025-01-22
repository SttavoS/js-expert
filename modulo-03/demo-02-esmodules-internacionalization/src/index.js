import database from "./../database.json" with { type: "json" };
import Person from "./Person.js";
import { save } from "./repository.js";
import TerminalController from "./TerminalController.js";

const DEAFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEAFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished!");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEAFAULT_LANG));
    await save(person);

    return mainLoop();
  } catch (error) {
    console.error("Deu ruim guri!", error);
    return mainLoop();
  }
}

await mainLoop();
