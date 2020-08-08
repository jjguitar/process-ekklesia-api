/* eslint-disable class-methods-use-this */
const { usersMock } = require('../utils/mocks/users');

class UsersService {
  async getUsers() {
    const users = await Promise.resolve(usersMock);
    return users || [];
  }

  async getUser() {
    const user = await Promise.resolve(usersMock[0]);
    return user || {};
  }

  async createUser() {
    const createUserId = await Promise.resolve(usersMock[0].id);
    return createUserId;
  }

  async updateUser() {
    const updateUserId = await Promise.resolve(usersMock[0].id);
    return updateUserId;
  }

  async deleteUser() {
    const deleteUserId = await Promise.resolve(usersMock[0].id);
    return deleteUserId;
  }
}

module.exports = UsersService;
