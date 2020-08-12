const MongoLib = require('../lib/mongo');

class UserProcessService {
  constructor() {
    this.collection = 'user-process';
    this.mongoDB = new MongoLib();
  }

  async getUserProcesses({ userId }) {
    const query = userId && { userId };
    const userProcesses = await this.mongoDB.getAll(this.collection, query);

    return userProcesses || [];
  }

  async createUserProcess({ userProcess }) {
    const createdUserProcessId = await this.mongoDB.create(
      this.collection,
      userProcess,
    );

    return createdUserProcessId;
  }

  async deleteUserProcess({ userProcessId }) {
    const deletedUserProcessId = await this.mongoDB.delete(
      this.collection,
      userProcessId,
    );

    return deletedUserProcessId;
  }
}

module.exports = UserProcessService;
