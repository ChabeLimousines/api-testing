const assert = require('assert');
const tryCall = require('../../utils/tryCall.utils');

const testModel = {
  name: 'resmodel1',
  make: 'MERCEDES',
  category: 'B',
};

const testModelUpper = { ...testModel };
Object.keys(testModelUpper)
  .forEach((k) => { testModelUpper[k] = testModelUpper[k].toUpperCase(); });

function testMountModels() {
  const testUpdate = {
    category: 'D',
    make: 'RENAULT',
  };

  describe('test void ressources', () => {
    it('get should return a 404', async () => {
      const getVoid = await tryCall('GET', '/vehicles/models/NOPENOPE');
      assert.equal(getVoid.status, 404);
    });
    it('delete should return a 404', async () => {
      const getVoid = await tryCall('DELETE', '/vehicles/models/NOPENOPE');
      assert.equal(getVoid.status, 404);
    });
    it('patch should return a 404', async () => {
      const getVoid = await tryCall('PATCH', '/vehicles/models/NOPENOPE', testUpdate);
      assert.equal(getVoid.status, 404);
    });
  });

  describe('test POST new', () => {
    it('should return a synchronized models', async () => {
      const postModel = await tryCall('POST', '/vehicles/models/', testModel);
      assert.equal(postModel.data.message, 'Model synchronised');
      assert.deepEqual(postModel.data.model, testModelUpper);
    });
    it('test POST existing ressource', async () => {
      const postModel = await tryCall('POST', '/vehicles/models/', testModel);
      assert.equal(postModel.status, 409);
    });
  });

  describe('test GET existing ressource', () => {
    it('should return the model', async () => {
      const getModel = await tryCall(
        'GET', `/vehicles/models/${testModel.name}`, {}, {}, {},
      );
      assert.deepEqual(getModel.data, testModelUpper);
    });
  });

  describe('test PATCH', () => {
    it('should update the model', async () => {
      const patchModel = await tryCall('PATCH', `/vehicles/models/${testModel.name}`, testUpdate);
      assert.equal(patchModel.data.message, `Model ${testModelUpper.name} update success`);
      assert.deepEqual(patchModel.data.model, testUpdate);
    });
  });

  describe('test GET updated', () => {
    it('should return the updated model', async () => {
      const getModel = await tryCall('GET', `/vehicles/models/${testModel.name}`, {});
      Object.keys(testUpdate).forEach((key) => {
        assert.equal(getModel.data[key], testUpdate[key]);
      });
    });
  });
}

function testUnmountModels() {
  describe('DELETE', () => {
    it('should delete model', async () => {
      const delModel = await tryCall('DELETE', `/vehicles/models/${testModel.name}`);
      assert.equal(delModel.data.message, `Model ${testModelUpper.name} DELETE success`);
    });
  });
}

module.exports = { testMountModels, testUnmountModels, testModel };
