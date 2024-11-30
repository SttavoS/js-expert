import faker from "faker";
import path, { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import Car from "../src/entities/Car.js";
import CarCategory from "../src/entities/CarCategory.js";
import Customer from "../src/entities/Customer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });

  customers.push(customer);
}

const write = (fileName, data) =>
  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data));

(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategories.json", [carCategory]);

  console.log("cars", cars);
  console.log("customers", customers);
  console.log("carCategories", [carCategory]);
})();
