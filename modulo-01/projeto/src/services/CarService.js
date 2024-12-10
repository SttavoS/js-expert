import BaseRepository from "../repositories/base/Repository.js";
import Tax from "../entities/Tax.js";
import Transaction from "../entities/Transaction.js";

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }

  /**
   * @param {Custmomer} customer
   * @param {CarCategory} carCategory
   * @param {Number} numberOfDays
   */
  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to,
    );

    const finalPrice = price * tax * numberOfDays;

    return this.currencyFormat.format(finalPrice);
  }

  async rent(customer, carCategory, nummberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      nummberOfDays,
    );

    const today = new Date();
    today.setDate(today.getDate() + nummberOfDays);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = today.toLocaleDateString("pt-br", options);

    const transaction = new Transaction({
      customer,
      dueDate,
      car,
      amount: finalPrice,
    });

    return transaction;
  }
}

export default CarService;
