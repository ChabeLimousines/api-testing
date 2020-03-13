const assert =require('assert');
const GWCaller = require('../services/GWCaller')

const gwCaller = new GWCaller();

describe('Test VEHICLES API', () => {

  let theModel;
  describe('GET ALL', () => {
    it('should return models to pick the first', async () => {
      const allModels = await gwCaller.call(
        'GET', `/vehicles/models/`, {}, {}, {},
      );
      theModel = allModels.data[0];
      assert.ok(theModel);
    });
  });

  const testVehi = {
    vehicleId: "DH-699-KP10",
    modelName: theModel,
    registration: "DH-699-KP10",
    label: "label1",
    mileage: 666,
    firstRegDate: "2015-01-01",
    initialCalendar: [{
      dateStart: "2020-02-20T10:00:00.000Z",
      dateEnd: "2020-03-19T10:00:00.000Z",
      agency: "CHABE",
  }]};
  const testUpdate = {
    label: "label2",
    mileage: 777,
    firstRegDate: "2014-02-01",
  };

  describe('DELETE', () => {
    it('should delete model or the ID is free', async () => {
      const delVehi = await gwCaller.call(
        'DELETE', `/vehicles/${testVehi.vehicleId}`, {}, {}, {},
      );
      assert.equal(delVehi.data.message, `Model ${testModel.name} DELETE success`);
    });
  });

  describe('POST', () => {
    it('should synchronize vehicle', async () => {
      const postVehi = await gwCaller.call(
        'POST', '/vehicles/', {}, {}, testVehi,
      );  
      assert.equal(postModel.data.message, 'Model synchronised');
      assert.deepEqual(postModel.data.model, testModel);
    });
  });

  describe('GET', () => {
    it('should return the vehicle', async () => {
      const getModel = await gwCaller.call(
        'GET', `/vehicles/${testVehi.vehicleId}`, {}, {}, {},
      );  
      assert.deepEqual(getModel.data, testModel);
    });
  });

  describe('PATCH', () => {
    it('should update the model', async () => {
      const patchModel = await gwCaller.call(
        'PATCH', `/vehicles/${testVehi.vehicleId}`, {}, {}, testUpdate,
      );  
      assert.equal(patchModel.data.message, `Model ${testModel.name} update success`);
      assert.deepEqual(patchModel.data.model, testUpdate);
    });
  });

  describe('GET', () => {
    it('should return the updated model', async () => {
      const getModel = await gwCaller.call(
        'GET', `/vehicles/${testModel.name}`, {}, {}, {},
      );
      Object.keys(testUpdate).forEach(key => {
        assert.equal(getModel.data[key], testUpdate[key]);
      });
    });
  });

});