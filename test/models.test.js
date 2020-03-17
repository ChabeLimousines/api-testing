const assert =require('assert');
const GWCaller = require('../services/GWCaller')

const gwCaller = new GWCaller();

describe('Test MODELS API', () => {

  const testModel = {
    name: 'TEST220CDI',
    make: 'MERCEDES',
    category: 'B',
  };
  const testUpdate = {
    category: 'D',
    make: 'RENAULT',
  };

  describe('POST', () => {
    it('should return a synchronized models', async () => {
      const postModel = await gwCaller.call(
        'POST', '/vehicles/models/', {}, {}, testModel,
      );  
      assert.equal(postModel.data.message, 'Model synchronised');
      assert.deepEqual(postModel.data.model, testModel);
    });
  });

  describe('GET', () => {
    it('should return the model', async () => {
      const getModel = await gwCaller.call(
        'GET', `/vehicles/models/${testModel.name}`, {}, {}, {},
      );  
      assert.deepEqual(getModel.data, testModel);
    });
  });

  describe('PATCH', () => {
    it('should update the model', async () => {
      const patchModel = await gwCaller.call(
        'PATCH', `/vehicles/models/${testModel.name}`, {}, {}, testUpdate,
      );  
      assert.equal(patchModel.data.message, `Model ${testModel.name} update success`);
      assert.deepEqual(patchModel.data.model, testUpdate);
    });
  });

  describe('GET', () => {
    it('should return the updated model', async () => {
      const getModel = await gwCaller.call(
        'GET', `/vehicles/models/${testModel.name}`, {}, {}, {},
      );
      Object.keys(testUpdate).forEach(key => {
        assert.equal(getModel.data[key], testUpdate[key]);
      });
    });
  });

  describe('DELETE', () => {
    it('should delete model', async () => {
      const delModel = await gwCaller.call(
        'DELETE', `/vehicles/models/${testModel.name}`, {}, {}, {},
      );
      assert.equal(delModel.data.message, `Model ${testModel.name} DELETE success`);
    });
  });

  describe('GET ALL', () => {
    it('should return models, not the deleted one', async () => {
      const allModels = await gwCaller.call(
        'GET', `/vehicles/models/`, {}, {}, {},
      );
      assert.equal(allModels.data.find(model => model.name === testModel.name), undefined);
    });
  });
});