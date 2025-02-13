import UserRepository from "../repository/UserRepository.js";
import UserService from "../service/UserService.js";
import Database from "../util/database.js";

export default class UserFactory {
  static async createInstance() {
    const db = new Database({ connectionString: "mongodb://localhost" });
    const dbConnection = await db.connect();
    const repo = new UserRepository({ dbConnection });
    const service = new UserService({ userRepository: repo });

    return service;
  }
}
