const MongoLib = require('../lib/mongo');

class UserLeadersService {
  constructor() {
    this.collection = 'user-leaders';
    this.mongoDB = new MongoLib();
  }

  async getUserLeaders({ userId }) {
    const query = userId && { userId };
    const userLeaders = await this.mongoDB.getAll(this.collection, query);

    return userLeaders || [];
  }

  async createUserLeader({ userLeader }) {
    const createdUserLeaderId = await this.mongoDB.create(
      this.collection,
      userLeader,
    );

    return createdUserLeaderId;
  }

  async deleteUserLeader({ userLeaderId }) {
    const deletedUserLeaderId = await this.mongoDB.delete(
      this.collection,
      userLeaderId,
    );

    return deletedUserLeaderId;
  }
}

module.exports = UserLeadersService;
