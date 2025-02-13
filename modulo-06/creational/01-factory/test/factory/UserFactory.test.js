import rewiremock from "rewiremock";
import { deepStrictEqual } from "node:assert";
import Database from "../../src/util/database.js";
import UserFactory from "../../src/factory/UserFactory.js";

//
const dbData = [{ name: "Joãozinho" }, { name: "Mariazinha" }];
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}
//

rewiremock(Database).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "JOÃOZINHO" }, { name: "MARIAZINHA" }];
    rewiremock.enable();

    const factory = await UserFactory.createInstance();
    const result = factory.find();
    deepStrictEqual(result, expected);

    rewiremock.disable();
  }
})();
