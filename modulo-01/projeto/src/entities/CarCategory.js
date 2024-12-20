import Base from "./base/Base.js";

class CarCategory extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name });

    this.carIds = carIds;
    this.price = price;
  }
}

export default CarCategory;
