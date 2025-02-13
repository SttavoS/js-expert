import UserFactory from "./factory/UserFactory.js";

(async () => {
  const userFactory = await UserFactory.createInstance();
  const result = await userFactory.find({ name: "Gustavo*" });
  console.log({ result });
})();
