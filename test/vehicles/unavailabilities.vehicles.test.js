const assert = require('assert');
const tryCall = require('../../utils/tryCall.utils');
const { testVehi } = require('./vehicles.vehicles.test');

// UNAVAILABILITIES
const testUnav = {
  idUnavailability: 'RES2',
  type: 'REPARATION',
  startDate: '2020-03-15 14:00:00',
  endDate: '2020-03-16 18:30:00',
  informations: 'truc truc',
};

function testMountUnavs() {
  const testUpdate = {
    informations: 'truc2',
    endDate: '2020-03-16 10:30:00',
  };

  describe('test void unav', () => {
    it('get should return a 404', async () => {
      const getVoid = await tryCall('GET', `/vehicles/${testVehi.vehicleId}/unavailabilities/NOPE`);
      assert.equal(getVoid.status, 404);
    });
    it('delete should return a 404', async () => {
      const getVoid = await tryCall('DELETE', `/vehicles/${testVehi.vehicleId}/unavailabilities/NOPE`);
      assert.equal(getVoid.status, 404);
    });
    it('patch should return a 404', async () => {
      const getVoid = await tryCall('PATCH', `/vehicles/${testVehi.vehicleId}/unavailabilities/NOPE`, testUpdate);
      assert.equal(getVoid.status, 404);
    });
  });


  describe('POST', () => {
    it('should post unav', async () => {
      const postUnav = await tryCall('POST', `/vehicles/${testVehi.vehicleId}/unavailabilities/`, testUnav);
      assert.deepEqual(postUnav.data.unavailability, testUnav);
    });
    it('should return 409 on second call', async () => {
      const postUnav = await tryCall('POST', `/vehicles/${testVehi.vehicleId}/unavailabilities/`, testUnav);
      assert.deepEqual(postUnav.status, 409);
    });
  });

  describe('test void parent vehicule', () => {
    it('get should return a 404', async () => {
      const getVoid = await tryCall('GET', `/vehicles/NOPENOPE/unavailabilities/${testUnav.idUnavailability}`);
      assert.equal(getVoid.status, 404);
    });
    it('delete should return a 404', async () => {
      const getVoid = await tryCall('DELETE', `/vehicles/NOPENOPE/unavailabilities/${testUnav.idUnavailability}`);
      assert.equal(getVoid.status, 404);
    });
    it('patch should return a 404', async () => {
      const getVoid = await tryCall('PATCH', `/vehicles/NOPENOPE/unavailabilities/${testUnav.idUnavailability}`);
      assert.equal(getVoid.status, 404);
    });
  });


  describe('GET MANY UNAV', () => {
    it('should return the unav', async () => {
      const getManyUnav = await tryCall('GET', `/vehicles/${testVehi.vehicleId}/unavailabilities/`, {},
        {
          from: '2019-01-01 14:00:00',
          to: '2020-12-30 18:30:00',
        });
      assert(
        getManyUnav.data
          .find((unav) => unav.idUnavailability === testUnav.idUnavailability) !== undefined,
        'Unavailability succesffully removed',
      );
    });
  });

  describe('GET', () => {
    it('should get the unav', async () => {
      const getUnav = await tryCall('GET',
        `/vehicles/${testVehi.vehicleId}/unavailabilities/${testUnav.idUnavailability}`);
      assert.deepEqual(getUnav.data, {
        idUnavailability: testUnav.idUnavailability.toUpperCase(),
        vehicleId: testVehi.vehicleId.toUpperCase(),
        type: testUnav.type.toUpperCase(),
        startDate: testUnav.startDate,
        endDate: testUnav.endDate,
        informations: testUnav.informations,
      });
    });
  });

  describe('PATCH', () => {
    it('should update the unav', async () => {
      const patchUnav = await tryCall('PATCH',
        `/vehicles/${testVehi.vehicleId}/unavailabilities/${testUnav.idUnavailability}`, testUpdate);
      assert.equal(patchUnav.data.message, 'Unavailability succesffully updated');
    });
  });

  describe('GET', () => {
    it('should return the updated unav', async () => {
      const getUnav = await tryCall('GET',
        `/vehicles/${testVehi.vehicleId}/unavailabilities/${testUnav.idUnavailability}`);
      assert.equal(getUnav.status, 200);
      assert.deepEqual(getUnav.data, {
        idUnavailability: testUnav.idUnavailability.toUpperCase(),
        vehicleId: testVehi.vehicleId.toUpperCase(),
        type: testUnav.type.toUpperCase(),
        startDate: testUnav.startDate,
        endDate: testUpdate.endDate,
        informations: testUpdate.informations,
      });
    });
  });
}

function testUnmountUnavs() {
  describe('DELETE', () => {
    it('should delete unav', async () => {
      const delVehi = await tryCall('DELETE',
        `/vehicles/${testVehi.vehicleId}/unavailabilities/${testUnav.idUnavailability}`);
      assert.equal(delVehi.data.message, 'Unavailability succesffully removed');
    });
  });

  describe('GET', () => {
    it('should return an 404', async () => {
      const getDeleted = await tryCall('GET', `/vehicles/${testVehi.vehicleId}/unavailabilities/${testUnav.idUnavailability}`);
      assert.equal(getDeleted.status, 404);
    });
  });
}

module.exports = { testMountUnavs, testUnmountUnavs };
