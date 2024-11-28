// import { describe, it, before, after } from "mocha";
const { describe, it, before, after } = require("mocha");
// import supertest from "supertest";
const supertest = require("supertest");
// import app from "./api.js";
// const app = require("./api");
// import assert from "assert";
const assert = require("assert");

describe("API Suite Test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });
  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("should request the contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us route");
    });
  });

  describe("/login:post", () => {
    it("should request the login and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "GustavoSchneider", password: "123456" })
        .expect(200);

      assert.strictEqual(response.text, "Login succeeded!");
    });

    it("should request the login and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "GustavoScheneider", password: "123" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "Login failed!");
    });
  });

  describe("/hi:get - 404", () => {
    it("should request and unexisting route and return HTTP Status 404", async () => {
      const response = await supertest(app).get("/hi").expect(404);

      assert.strictEqual(response.text, "not found!");
    });
  });
});