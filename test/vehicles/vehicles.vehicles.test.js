const assert = require('assert');
const tryCall = require('../../utils/tryCall.utils');
const { testModel } = require('./models.vehicles.test');

const testVehi = {
  vehicleId: 'Reserved4',
  registration: 'RESERVED4',
  label: 'labeL1',
  modelName: testModel.name,
  mileage: 666,
  nbSeats: 0,
  firstRegDate: '2015-01-01',
  initialCalendar: [{
    dateStart: '2020-02-20T10:00:00.000Z',
    dateEnd: '2020-03-19T10:00:00.000Z',
    agency: 'CHABE',
  }],
};

function testMountVehicles() {
  const testUpdate = {
    label: 'label2',
    mileage: 777,
    nbSeats: 4,
    firstRegDate: '2014-02-01',
  };
  const vehiId = testVehi.vehicleId.toUpperCase();

  describe('test void ressource', () => {
    it('get void should 404', async () => {
      const postVehi = await tryCall('GET', '/vehicles/NOPENOPE');
      assert.equal(postVehi.status, 404);
    });
    it('delete void should 404', async () => {
      const delVehi = await tryCall('DELETE', '/vehicles/NOPENOPE');
      assert.equal(delVehi.status, 404);
    });
    it('patch void should 404', async () => {
      const patchVehi = await tryCall('PATCH', '/vehicles/NOPENOPE', testUpdate);
      assert.equal(patchVehi.status, 404);
    });
  });

  describe('test POST', () => {
    it('should synchronize vehicle', async () => {
      const postVehi = await tryCall('POST', '/vehicles/', testVehi);
      assert.equal(postVehi.data.vehicleId, vehiId);
    });
    it('should 409 on existing vehi', async () => {
      const postVehi = await tryCall('POST', '/vehicles/', testVehi);
      assert.equal(postVehi.status, 409);
    });
  });

  describe('GET', () => {
    it('should return the vehicle', async () => {
      const postVehi = await tryCall('GET', `/vehicles/${testVehi.vehicleId}`, {});
      assert.deepEqual(postVehi.data, {
        vehicleId: vehiId,
        registration: testVehi.registration.toUpperCase(),
        label: testVehi.label,
        mileage: testVehi.mileage,
        firstRegDate: '2015-01-01',
        nbSeats: testVehi.nbSeats,
        modelName: testVehi.modelName.toUpperCase(),
      });
    });
  });

  describe('PATCH', () => {
    it('should update the vehicle', async () => {
      const patchModel = await tryCall('PATCH', `/vehicles/${testVehi.vehicleId}`, testUpdate);
      assert.equal(patchModel.data.vehicleId, vehiId);
    });
  });

  describe('GET', () => {
    it('should return the updated vehicle', async () => {
      const getVehi = await tryCall('GET', `/vehicles/${testVehi.vehicleId}`, {});
      Object.keys(testUpdate).forEach((key) => {
        assert.equal(getVehi.data[key], testUpdate[key]);
      });
    });
  });
}

function testUnmountVehicles() {
  describe('DELETE', () => {
    it('should delete model or the ID is free', async () => {
      const delVehi = await tryCall('DELETE', `/vehicles/${testVehi.vehicleId}`);
      assert(delVehi.data.message === 'Vehicle deleted');
    });
  });
}

module.exports = { testVehi, testMountVehicles, testUnmountVehicles };
