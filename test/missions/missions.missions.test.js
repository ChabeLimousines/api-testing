const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
const { filterCommonKeys, updatedObject } = require('../../utils/objects.utils');
// const { passFull, passMin } = require('./passenger.missions.test');
// const { placeFull, placeMin } = require('./places.missions.test');
const placeFull = { placeId: 'CDG' };
const placeMin = { placeId: 'CDG' };
const passFull = { passengerId: 928565 };
const passMin = { passengerId: 928565 };


const data1 = [{
  client: 'FFTRPM',
  pickupPlace: 'ORLY 1',
  dropoffPlace: 'ROLAND GARROS',
  hireDate: '2020-06-16T22:00:00.000Z',
  serviceType: 'TAO',
  department: 'NANTERRE2',
  hireEnd: '2020-06-17T02:15:00.000Z',
  pax: 2,
  travelDetails: 'AF0002',
  requestedVehicleClass: 'FEDEX',
  observation: 'ETAPE: 1111',
  refClient: 'data test 1',
  passenger: {
    newPassenger: {
      civility: 'Mme',
      lastName: 'Un',
      firstName: 'Kevin',
      phoneNumber: '0123456789',
    },
  },
}];
const data2 = [{
  client: 'FFTRPM',
  pickupPlace: placeFull.placeId,
  dropoffPlace: placeMin.placeId,
  hireDate: '2020-06-16T22:00:00.000Z',
  hireEnd: '2020-06-17T02:15:00.000Z',
  serviceType: '_',
  department: 'NANTERRE2',
  pax: 1,
  destProv: 'London St Pancras',
  missionGroupId: 121212,
  travelDetails: 'AF0002',
  requestedVehicleClass: 'ECLASS',
  observation: 'data2 mission1',
  modeTVA: true,
  hireNumber: 'AAGD65',
  bookingNumber: '987856789',
  refClient: 'test123',
  internalObservation: 'Internal secret message',
  contact: 'Jean-Robert',
  salesRep: 'INTERFACE',
  passenger: {
    newPassenger: {
      civility: 'Mme',
      lastName: 'Deux',
      firstName: 'Kevin',
      phoneNumber: '0123456789',
    },
  },
},
{
  client: 'FFTRPM',
  pickupPlace: placeFull.placeId,
  hireDate: '2020-06-16T01:00:00.000Z',
  serviceType: '*',
  department: 'NANTERRE2',
},
{
  client: 'FFTRPM',
  pickupPlace: placeMin.placeId,
  dropoffPlace: placeFull.placeId,
  hireDate: '2020-06-16T22:00:00.000Z',
  serviceType: '_',
  department: 'NANTERRE2',
  hireEnd: '2020-06-17T02:15:00.000Z',
  pax: 2,
  requestedVehicleClass: 'FEDEX',
  observation: 'data2 mission3',
  refClient: 'refClient1',
  passenger: {
    passengerId: passFull.passengerId,
  },
},
{
  client: 'FFTRPM',
  pickupPlace: 'CDG',
  dropoffPlace: 'PDG',
  hireDate: '2020-06-17T23:20:00.000Z',
  serviceType: 'TAR',
  department: 'NANTERRE2',
  hireEnd: '2020-06-18T01:20:00.000Z',
  pax: 5,
  travelDetails: 'AF0002',
  requestedVehicleClass: 'SCLASS',
  observation: 'PASSAGER1|PASSAGER2',
  passenger: {
    passengerId: passMin.passengerId,
  },
}];

// To patch data2[1]
const patchLong = {
  dropoffPlace: placeMin.placeId,
  hireDate: '2020-06-17T01:00:00.00Z',
  hireEnd: '2020-06-18T03:15:00.000Z',
  serviceType: 'TDG',
  department: 'NANTERRE2',
  pax: 2,
  destProv: 'Lyon St Ex',
  missionGroupId: 0,
  travelDetails: 'AF0003',
  requestedVehicleClass: 'SCLASS',
  observation: 'data2 mission2',
  modeTVA: false,
  hireNumber: 'TRUC7676',
  bookingNumber: '11111',
  refClient: 'lala__0',
  internalObservation: 'Secret message',
  contact: 'Marie-Micheline',
  operator: 'INTERAFCE',
  passenger: {
    newPassenger: {
      civility: 'M.',
      lastName: 'Un',
      firstName: 'Nouveau',
      phoneNumber: '0909098765',
    },
  },
};
// To patch data2[0]
const patchShort = {
  pickupPlace: placeFull.placeId,
  hireDate: '2020-06-15T01:00:00.000Z',
  serviceType: '_',
};

function testMountMissions() {
  describe('test void ressources', () => {
    it('get should return a 404', async () => {
      const getVoid = await tryCall('GET', '/missions/0');
      assert.equal(getVoid.status, 404);
    });
    it('delete should return a 404', async () => {
      const getVoid = await tryCall('DELETE', '/missions/0');
      assert.equal(getVoid.status, 404);
    });
    it('patch should return a 404', async () => {
      const getVoid = await tryCall('PATCH', '/missions/0');
      assert.equal(getVoid.status, 404);
    });
  });


  describe('test POST incorrects', () => {
    it('No clientId, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        pickupPlace: placeFull.placeId,
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 400);
    });
    it('No pickup place, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 400);
    });
    it('No serviceType, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        hireDate: '2020-06-16T01:00:00Z',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 400);
    });
    it('No hireDate, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 400);
    });
    it('Passenger both new and with id, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
        passenger: {
          newPassenger: { civility: 'M', lastName: 'TEST' },
          passengerId: passMin.passengerId,
        },
      }]);
      assert.equal(post.status, 400);
    });
    it('Passenger reference bad, should 412', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
        passenger: {
          passengerId: 0,
        },
      }]);
      assert.equal(post.status, 412);
    });
    // Impossible to detect, will 201
    it('PickupPlace incorrect, should 201', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: 'NOPENOPE',
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 201);
    });
    // Impossible to detect, will 201
    it('Dropoff Place incorrect, should 201', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        dropoffPlace: 'NOPENOPE',
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 201);
    });
    // Impossible to detect, will 201
    it('Client incorrect, should 201', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'NOPENOPE',
        pickupPlace: placeFull.placeId,
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }, {
        client: 'FS',
        pickupPlace: 'NOPENOPE',
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 201);
    });
    it('should 412 when double 412 error', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'NOPENOPE',
        pickupPlace: placeFull.placeId,
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 412);
    });
    it('HireDate incorrect, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        hireDate: '2020-23-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 400);
    });
    it('HireEnd incorrect, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        hireDate: '2021-09-16T13:30:00Z',
        hireEnd: '2021-09-16T25:30:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 400);
    });
  });

  describe('test POST', () => {
    it('should POST 1 mission', async () => {
      const post = await tryCall('POST', '/missions/', data1);
      assert.equal(post.status, 201);
      assert.equal(post.data.success[0].client, data1[0].client.toUpperCase());
      assert.equal(post.data.success[0].pickupPlace, data1[0].pickupPlace);
      assert.equal(post.data.success[0].dropoffPlace, data1[0].dropoffPlace);
      assert.equal(post.data.success[0].hireDate, data1[0].hireDate);
      assert.equal(post.data.success[0].hireEnd, data1[0].hireEnd);
      assert.equal(post.data.success[0].department, data1[0].department);
      assert.equal(post.data.success[0].serviceType, data1[0].serviceType);
      assert.equal(post.data.success[0].pax, data1[0].pax);
      assert.equal(post.data.success[0].travelDetails, data1[0].travelDetails);
      assert.equal(post.data.success[0].requestedVehicleClass, data1[0].requestedVehicleClass);
      assert.equal(post.data.success[0].refClient, data1[0].refClient);
      assert.equal(post.data.success[0].observation, data1[0].observation);
      // Verify generated numbers
      expect(post.data.success[0].missionId).to.be.a('number');
      expect(post.data.success[0].passengerId).to.be.a('number');
      // add missionId
      data1[0].missionId = post.data.success[0].missionId;
      expect(data1[0].missionId).to.be.a('number');
      // update passenger
      data1[0].passenger = data1[0].passenger.newPassenger;
      data1[0].passenger.passengerId = post.data.success[0].passengerId;
      expect(data1[0].passenger.passengerId).to.be.a('number');
    });

    it('should POST 4 missions', async () => {
      const post = await tryCall('POST', '/missions/', data2);
      assert.equal(post.status, 201);
      for (let i = 0; i < data2.length; i += 1) {
        assert.equal(post.data.success[i].client, data2[i].client.toUpperCase());
        assert.equal(post.data.success[i].pickupPlace, data2[i].pickupPlace);
        assert.equal(post.data.success[i].dropoffPlace, data2[i].dropoffPlace);
        assert.equal(post.data.success[i].hireDate, data2[i].hireDate);
        assert.equal(post.data.success[i].hireEnd, data2[i].hireEnd);
        assert.equal(post.data.success[i].department, data2[i].department);
        assert.equal(post.data.success[i].serviceType, data2[i].serviceType);
        assert.equal(post.data.success[i].pax, data2[i].pax);
        assert.equal(post.data.success[i].destProv, data2[i].destProv);
        assert.equal(post.data.success[i].missionGroupId, data2[i].missionGroupId);
        assert.equal(post.data.success[i].requestedVehicleClass, data2[i].requestedVehicleClass);
        assert.equal(post.data.success[i].modeTVA, data2[i].modeTVA);
        assert.equal(post.data.success[i].observation, data2[i].observation);
        assert.equal(post.data.success[i].hireNumber, data2[i].hireNumber);
        assert.equal(post.data.success[i].bookingNumber, data2[i].bookingNumber);
        assert.equal(post.data.success[i].refClient, data2[i].refClient);
        assert.equal(post.data.success[i].internalObservation, data2[i].internalObservation);
        assert.equal(post.data.success[i].contact, data2[i].contact);
        assert.equal(post.data.success[i].salesRep, data2[i].salesRep);

        expect(post.data.success[i].missionId).to.be.a('number');
        if (data2[i].passenger) expect(post.data.success[i].passengerId).to.be.a('number');
        // add mission id
        data2[i].missionId = post.data.success[i].missionId;
        expect(data2[i].missionId).to.be.a('number');
        // update passenger
        if (data2[i].passenger && data2[i].passenger.newPassenger) {
          data2[i].passenger = data2[i].passenger.newPassenger;
          data2[i].passenger.passengerId = post.data.success[i].passengerId;
          expect(data2[i].passenger.passengerId).to.be.a('number');
        }
      }
    });
  });

  describe('test GET existing missions', () => {
    it('GET the mission from data1', async () => {
      const get = await tryCall('GET', `/missions/${data1[0].missionId}`);
      const filtered = filterCommonKeys(get.data, data1[0]);
      assert.deepEqual(filtered, data1[0]);
    });

    it('GET all 4 missions from data2', async () => {
      for (let i = 0; i < data2.length; i += 1) {
        const get = await tryCall('GET', `/missions/${data2[i].missionId}`);
        const filtered = filterCommonKeys(get.data, data2[i]);
        if (filtered.passenger) {
          filtered.passenger = filterCommonKeys(filtered.passenger, data2[i].passenger);
        }
        assert.deepEqual(filtered, data2[i]);
      }
    });
  });

  // describe('test PATCH', () => {
  //   it('PATCH mission short', async () => {
  //     const patch = await tryCall('PATCH', `/missions/${data2[0].missionId}`, patchShort);
  //     assert.equal(patch.status, 200);
  //   });
  //   it('PATCH mission full with passengerId', async () => {
  //     const patch = await tryCall('PATCH', `/missions/${data2[1].missionId}`, patchLong);
  //     assert.equal(patch.status, 200);
  //   });
  // });

  // describe('test GET patched missions', () => {
  //   it('GET mission mini', async () => {
  //     const get = await tryCall('POST', `/missions/${data2[0].missionId}`);
  //     assert.deepEqual(get.data, updatedObject(data2[0], patchShort));
  //   });
  //   it('GET mission full with passengerId', async () => {
  //     const get = await tryCall('POST', `/missions/${data2[1].missionId}`);
  //     assert.deepEqual(get.data, updatedObject(data2[1], patchLong));
  //   });
  // });
}

/*
test get many missions
*/

function testUnmountMissions() {

}

module.exports = { testMountMissions, testUnmountMissions };
