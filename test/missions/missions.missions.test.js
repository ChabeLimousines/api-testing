const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
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
  hireDate: '2020-06-16T22:00:00Z',
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
  hireDate: '2020-06-16T22:00:00Z',
  hireEnd: '2020-06-17T02:15:00.000Z',
  serviceType: '_',
  department: 'NANTERRE2',
  pax: 0,
  travelDetails: 'AF0002',
  requestedVehicleClass: 'ECLASS',
  observation: 'data2 mission1',
  refClient: 'test123',
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
  hireDate: '2020-06-16T01:00:00Z',
  serviceType: '*',
  department: 'NANTERRE2',
},
{
  client: 'FFTRPM',
  pickupPlace: placeMin.placeId,
  dropoffPlace: placeFull.placeId,
  hireDate: '2020-06-16T22:00:00Z',
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
  hireDate: '2020-06-17T23:20:00Z',
  serviceType: 'TAR',
  department: 'NANTERRE2',
  hireEnd: '2020-06-17T01:20:00.000Z',
  pax: 5,
  travelDetails: 'AF0002',
  requestedVehicleClass: 'SCLASS',
  observation: 'PASSAGER1|PASSAGER2',
  passenger: {
    passengerId: passMin.passengerId,
  },
}];

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
    it('PickupPlace incorrect, should 412', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: 'NOPENOPE',
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 412);
    });
    it('Dropoff Place incorrect, should 412', async () => {
      const post = await tryCall('POST', '/missions/', [{
        client: 'FS',
        pickupPlace: placeFull.placeId,
        dropoffPlace: 'NOPENOPE',
        hireDate: '2020-06-16T01:00:00Z',
        serviceType: '*',
        department: 'NANTERRE2',
      }]);
      assert.equal(post.status, 412);
    });
    it('Client incorrect, should 412', async () => {
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


/*
test get many missions
*/
// describe('test POST', () => {
  //   it('should POST 1 mission', async () => {
  //   });
  //   it('should POST 4 missions', async () => {
  //   });
  // });

  // describe('test GET existing missions', () => {
  //   it('GET mission mini', async () => {
  //   });
  //   it('GET mission full with passengerId', async () => {
  //   });
  //   it('GET mission full with new passenger', async () => {
  //   });
  // });

  // describe('test PATCH', () => {
  //   it('PATCH mission mini', async () => {
  //   });
  //   it('PATCH mission full with passengerId', async () => {
  //   });
  //   it('PATCH mission full with new passenger', async () => {
  //   });
  // });

  // describe('test GET patched missions', () => {
  //   it('GET mission mini', async () => {
  //   });
  //   it('GET mission full with passengerId', async () => {
  //   });
  //   it('GET mission full with new passenger', async () => {
  //   });
  // });
}

function testUnmountMissions() {

}

module.exports = { testMountMissions, testUnmountMissions };