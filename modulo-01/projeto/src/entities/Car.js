import Base from "./base/Base.js";

class Car extends Base {
  constructor({ id, name, releaseYear, available, gasAvailable }) {
    super({ id, name });

    this.releaseYear = releaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }
}

export default Car;
