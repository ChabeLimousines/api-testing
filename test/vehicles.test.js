const assert =require('assert');
const GWCaller = require('../services/GWCaller')

const gwCaller = new GWCaller();

describe('Test VEHICLES API', () => {

  let theModel;
  const testVehi = {
    vehicleId: "Reserved1",
    registration: "RESERVED1",
    label: "labeL1",
    mileage: 666,
    nbSeats: 0,
    firstRegDate: "2015-01-01",
    initialCalendar: [{
      dateStart: "2020-02-20T10:00:00.000Z",
      dateEnd: "2020-03-19T10:00:00.000Z",
      agency: "CHABE",
  }]};
  const testUpdate = {
    label: "label2",
    mileage: 777,
    nbSeats: 4,
    firstRegDate: "2014-02-01",
  };
  const vehiId = testVehi.vehicleId.toUpperCase();

  describe('GET ALL', () => {
    it('should return models to pick the first', async () => {
      const allModels = await gwCaller.call(
        'GET', `/vehicles/models/`, {}, {}, {},
      );
      theModel = allModels.data[0];
      testVehi.modelName = theModel.name;
      assert.ok(testVehi.modelName);
      assert.ok(theModel);
    });
  });

  describe('DELETE', () => {
    it('should delete model or the ID is free', async () => {
      try {
        const delVehi = await gwCaller.call(
          'DELETE', `/vehicles/${testVehi.vehicleId}`, {}, {}, {},
        );
        assert.equal(delVehi.data.message, 'Vehicle deleted');
      } catch (e) {
        assert.equal(`Vehicle ${vehiId} not found`, e.data.error);
      }
    });
  });

  describe('POST', () => {
    it('should synchronize vehicle', async () => {
      const postVehi = await gwCaller.call(
        'POST', '/vehicles/', {}, {}, testVehi,
      );  
      assert.deepEqual(postVehi.data.vehicleId, vehiId);
    });
  });

  describe('GET', () => {
    it('should return the vehicle', async () => {
      const postVehi = await gwCaller.call(
        'GET', `/vehicles/${testVehi.vehicleId}`, {}, {}, {},
      );  
      assert.deepEqual(postVehi.data, {
        vehicleId: vehiId,
        registration: testVehi.registration.toUpperCase(),
        label: testVehi.label.toUpperCase(),
        mileage: testVehi.mileage,
        firstRegDate: "2015-01-01",
        nbSeats: testVehi.nbSeats,
        modelName: testVehi.modelName,
      });
    });
  });

  describe('PATCH', () => {
    it('should update the vehicle', async () => {
      const patchModel = await gwCaller.call(
        'PATCH', `/vehicles/${testVehi.vehicleId}`, {}, {}, testUpdate,
      );  
      assert.equal(patchModel.data.vehicleId, vehiId);
    });
  });

  describe('GET', () => {
    it('should return the updated vehicle', async () => {
      const getVehi = await gwCaller.call(
        'GET', `/vehicles/${testVehi.vehicleId}`, {}, {}, {},
      );
      Object.keys(testUpdate).forEach(key => {
        if(typeof testUpdate[key] === 'string') {
          assert.equal(getVehi.data[key], testUpdate[key].toUpperCase());
        } else {
          assert.equal(getVehi.data[key], testUpdate[key]);
        }
      });
    });
  });

});