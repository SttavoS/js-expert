// import http from "node:http";
// import { once } from "node:events";
const http = require("http");
const { once } = require("events");

const DEFAULT_USER = {
  username: "GustavoSchneider",
  password: "123456",
};

const routes = {
  "GET:/contact": (request, response) => {
    response.write("contact us route");
    return response.end();
  },
  //  curl -X POST --data '{"username":"Gustavoschneider","password":"12345"}' localhost:3000/contact
  "POST:/login": async (request, response) => {
    const user = JSON.parse(await once(request, "data"));
    if (
      user.username !== DEFAULT_USER.username ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.end("Login failed!");
      return;
    }

    return response.end("Login succeeded!");
  },
  default(request, response) {
    response.writeHead(404);
    return response.end("not found!");
  },
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${method}:${url}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("runnig at 3000"));

module.exports = app;
// export default app;
