const MongoLib = require('../lib/mongo');

class ProcessesService {
  constructor() {
    this.collection = 'process';
    this.mongoDB = new MongoLib();
  }

  async getProcesses({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const processes = await this.mongoDB.getAll(this.collection, query);
    return processes || [];
  }

  async getProcess({ processId }) {
    const processUnique = await this.mongoDB.get(this.collection, processId);
    return processUnique || {};
  }

  async createProcess({ processUnique }) {
    const createProcessId = this.mongoDB.create(this.collection, processUnique);
    return createProcessId;
  }

  async updateProcess({ processId, processUnique }) {
    const updateProcessId = await this.mongoDB.update(this.collection, processId, processUnique);
    return updateProcessId;
  }

  async deleteProcess({ processId }) {
    const deleteProcessId = await this.mongoDB.delete(this.collection, processId);
    return deleteProcessId;
  }
}

module.exports = ProcessesService;
