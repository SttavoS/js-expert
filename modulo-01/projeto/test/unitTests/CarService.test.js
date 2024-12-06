import { afterEach, before, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import path, { join } from "node:path";
import { fileURLToPath } from "url";

import CarService from "../../src/services/CarService.js";
import validCarCategoryMock from "../mocks/valid-carCategory.json" with { type: "json" };
import validCarMock from "../mocks/valid-car.json" with { type: "json" };
import validCustomer from "../mocks/valid-customer.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const carsDatabase = join(__dirname, "./../../database", "cars.json");

const mocks = {
  validCarCategory: validCarCategoryMock,
  validCar: validCarMock,
  validCustomer: validCustomer,
};

describe("CarService Suite Tests", () => {
  let carService = {};
  let sandbox = {};

  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("given a CarCategory it should return a available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.ids = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.name).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});
