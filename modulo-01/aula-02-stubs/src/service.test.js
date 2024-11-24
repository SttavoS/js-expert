import assert from "node:assert/strict";
import { createSandbox } from "sinon";
import { Service } from "./service.js";
import alderaan from '../mocks/alderaan.json' with {type: "json"};
import tatooine from '../mocks/tatooine.json' with {type: "json"};

const sinon = createSandbox();

const BASE_URL = 'https://swapi.dev/api';
const BASE_URL_PLANET_1 = `${BASE_URL}/planets/1/`;
const BASE_URL_PLANET_2 = `${BASE_URL}/planets/2/`;

const mocks = {
  alderaan, tatooine
};

(async () => {
  // Vai para a internet
  // {
  //   const service = new Service();
  //   const data = await service.makeRequest(BASE_URL_PLANET_1);
  //   console.log(JSON.stringify(data))
  // }
  //
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_PLANET_1)
    .resolves(tatooine)
  stub
    .withArgs(BASE_URL_PLANET_2)
    .resolves(alderaan)

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearIn: 5
    }
    const results = await service.getPlanets(BASE_URL_PLANET_1)
    assert.deepStrictEqual(results, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearIn: 2
    }
    const results = await service.getPlanets(BASE_URL_PLANET_2)
    assert.deepStrictEqual(results, expected)
  }

})();

