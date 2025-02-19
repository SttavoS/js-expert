export default class UserRepository {
  constructor({ dbConnection }) {
    this.dbConnection = dbConnection;
  }

  async find(query) {
    return this.dbConnection.find(query);
  }
}
