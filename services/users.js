const MongoLib = require('../lib/mongo');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser({ userAssignId }) {
    const user = await this.mongoDB.get(this.collection, userAssignId);
    return user || {};
  }

  async createUser({ user }) {
    const createUserId = this.mongoDB.create(this.collection, user);
    return createUserId;
  }

  async updateUser({ userAssignId, user }) {
    const updateUserId = await this.mongoDB.update(this.collection, userAssignId, user);
    return updateUserId;
  }

  async deleteUser({ userAssignId }) {
    const deleteUserId = await this.mongoDB.delete(this.collection, userAssignId);
    return deleteUserId;
  }
}

module.exports = UsersService;
