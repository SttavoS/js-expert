import Base from "./base/Base.js";

class Customer extends Base {
  constructor({ id, name, age }) {
    super({ id, name });

    this.age = age;
  }
}

export default Customer;
