const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
const { filterCommonKeys } = require('../../utils/objects.utils');
// const { passFull, passMin } = require('./passenger.missions.test');
// const { placeFull, placeMin } = require('./places.missions.test');
const placeFull = { placeId: 'CDG' };
const placeMin = { placeId: 'CDG' };
const passFull = { passengerId: 928565 };
const passMin = { passengerId: 928565 };

const data1 = [
  {
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
  },
];
const data2 = [
  {
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
    advertisedPriceExclVAT: 150.9,
    advertisedPriceInclVAT: 181.08,
    advertisedPriceInfos: 'Some additionnal infos',
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
    advertisedPriceExclVAT: 139,
    advertisedPriceInclVAT: 200,
    advertisedPriceInfos: 'Price announced to client',
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
  },
];

// To patch data2[0]
const patchLong = {
  client: 'RITZ',
  contact: 'STARFOULA',
  pickupPlace: placeFull.placeId,
  dropoffPlace: placeFull.placeId,
  serviceType: 'TARH',
  serviceLabel: 'Transport roissy avec hotesse',
  hireDate: '2020-06-17T01:00:00.000Z',
  hireEnd: '2020-06-18T03:15:00.000Z',
  comment: 'Un joli commentaire',
  flightTime: '2020-06-20T20:00:00.000Z',
  salesRep: 'INTERFACE',
  destProv: 'Lyon St Ex',
  department: 'NANTERRE2',
  hireNumber: 'TRUC7676',
  bookingNumber: '11111',
  refClient: 'lala__0',
  internalObservation: 'Secret message 2',
  requestedVehicleClass: 'SCLASS',
  modeTVA: false,
  pax: 10,
  orderCanal: 'ZENBOOKING',
  advertisedPriceExclVAT: 150,
  advertisedPriceInclVAT: 300,
  advertisedPriceInfos: 'Infos',
  passenger: {
    newPassenger: {
      civility: 'M',
      lastName: 'Un',
      firstName: 'Nouveau',
      phoneNumber: '0909098765',
    },
  },
  driverAbilities: [
    {
      code: 'ANGLAIS A2',
    },
  ],
  clientInstructions: [
    {
      code: 'ENCAISSEMENT',
    },
  ],
};

// To patch data2[0]
const patchShort = {
  comment: 'Need to update mission',
  contact: 'STARFOULA',
  serviceLabel: 'Transport roissy avec hotesse',
  hireDate: '2020-06-17T01:00:00.000Z',
  orderCanal: 'ZENBOOKING',
  subcontractorId: 'ALLETS',
  driverAbilities: [
    {
      code: 'ANGLAIS A2',
    },
  ],
};

// To patch data2[0]
const patchNullValues = {
  refClient: null,
  comment: 'Need to reset some values',
  travelDetails: null,
  destProv: null,
  flightTime: null,
  observation: null,
  internalObservation: null,
  advertisedPriceExclVAT: 0,
  advertisedPriceInclVAT: 0,
  advertisedPriceInfos: null,
};

const patchNullValues2 = {
  refClient: 'not null',
  comment: 'Need to reset some values',
  travelDetails: 'not null',
  destProv: 'not null',
  flightTime: '2020-06-17T01:00:00.000Z',
  observation: 'not null',
  internalObservation: 'not null',
  advertisedPriceExclVAT: 1,
  advertisedPriceInclVAT: 2.9,
  advertisedPriceInfos: 'not null',
};

// To cancel data2[0]
const cancelMissionLong = {
  reason: 'A very good reason to cancel a mission',
  canceledByClient: true,
  salesRep: 'INTERFACE',
};

// To cancel data2[0]
const cancelMissionShort = {
  reason: 'A very good reason to cancel a mission',
};

function testMountMissions() {
  describe('test incoming data', () => {
    it('should have correct passenger', async () => {
      expect(passFull.passengerId).to.be.a('number');
      expect(passMin.passengerId).to.be.a('number');
      data2[2].passenger.passengerId = passFull.passengerId;
      data2[3].passenger.passengerId = passMin.passengerId;
      expect(data2[2].passenger.passengerId).to.be.a('number');
      expect(data2[3].passenger.passengerId).to.be.a('number');
    });
    it('should have correct place', async () => {
      expect(placeFull.placeId).to.not.be.an('undefined');
      expect(placeMin.placeId).to.not.be.an('undefined');
    });
  });

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
      const getVoid = await tryCall('PATCH', '/missions/0', {
        contact: 'Pierre Dupont',
      });
      assert.equal(getVoid.status, 404);
    });
  });

  describe('test POST incorrects', () => {
    it('No clientId, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          pickupPlace: placeFull.placeId,
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 400);
    });
    it('No pickup place, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 400);
    });
    it('No serviceType, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          hireDate: '2020-06-16T01:00:00Z',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 400);
    });
    it('No hireDate, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 400);
    });
    it('Passenger both new and with id, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
          passenger: {
            newPassenger: { civility: 'M', lastName: 'TEST' },
            passengerId: passMin.passengerId,
          },
        },
      ]);
      assert.equal(post.status, 400);
    });
    it('Passenger reference bad, should 412', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
          passenger: {
            passengerId: 0,
          },
        },
      ]);
      assert.equal(post.status, 412);
    });
    // Impossible to detect, will 201
    it('PickupPlace incorrect, should 201', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: 'NOPENOPE',
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 201);
    });
    // Impossible to detect, will 201
    it('Dropoff Place incorrect, should 201', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          dropoffPlace: 'NOPENOPE',
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 201);
    });
    // Impossible to detect, will 201
    it('Client incorrect, should 201', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'NOPENOPE',
          pickupPlace: placeFull.placeId,
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
        {
          client: 'FS',
          pickupPlace: 'NOPENOPE',
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 201);
    });
    it('should 412 when double 412 error', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'NOPENOPE',
          pickupPlace: placeFull.placeId,
          hireDate: '2020-06-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 412);
    });
    it('HireDate incorrect, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          hireDate: '2020-23-16T01:00:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
      assert.equal(post.status, 400);
    });
    it('HireEnd incorrect, should 400', async () => {
      const post = await tryCall('POST', '/missions/', [
        {
          client: 'FS',
          pickupPlace: placeFull.placeId,
          hireDate: '2021-09-16T13:30:00Z',
          hireEnd: '2021-09-16T25:30:00Z',
          serviceType: '*',
          department: 'NANTERRE2',
        },
      ]);
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
      assert.equal(
        post.data.success[0].requestedVehicleClass,
        data1[0].requestedVehicleClass,
      );
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
        assert.equal(
          post.data.success[i].client,
          data2[i].client.toUpperCase(),
        );
        assert.equal(post.data.success[i].pickupPlace, data2[i].pickupPlace);
        assert.equal(post.data.success[i].dropoffPlace, data2[i].dropoffPlace);
        assert.equal(post.data.success[i].hireDate, data2[i].hireDate);
        assert.equal(post.data.success[i].hireEnd, data2[i].hireEnd);
        assert.equal(post.data.success[i].department, data2[i].department);
        assert.equal(post.data.success[i].serviceType, data2[i].serviceType);
        assert.equal(post.data.success[i].pax, data2[i].pax);
        assert.equal(post.data.success[i].destProv, data2[i].destProv);
        assert.equal(
          post.data.success[i].missionGroupId,
          data2[i].missionGroupId,
        );
        assert.equal(
          post.data.success[i].requestedVehicleClass,
          data2[i].requestedVehicleClass,
        );
        assert.equal(post.data.success[i].modeTVA, data2[i].modeTVA);
        assert.equal(post.data.success[i].observation, data2[i].observation);
        assert.equal(post.data.success[i].hireNumber, data2[i].hireNumber);
        assert.equal(
          post.data.success[i].bookingNumber,
          data2[i].bookingNumber,
        );
        assert.equal(post.data.success[i].refClient, data2[i].refClient);
        assert.equal(
          post.data.success[i].internalObservation,
          data2[i].internalObservation,
        );
        assert.equal(post.data.success[i].contact, data2[i].contact);
        assert.equal(post.data.success[i].salesRep, data2[i].salesRep);
        assert.equal(
          post.data.success[i].advertisedPriceExclVAT,
          data2[i].advertisedPriceExclVAT,
        );

        expect(post.data.success[i].missionId).to.be.a('number');
        if (data2[i].passenger) {
          expect(post.data.success[i].passengerId).to.be.a('number');
        }
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
          filtered.passenger = filterCommonKeys(
            filtered.passenger,
            data2[i].passenger,
          );
        }
        assert.deepEqual(filtered, data2[i]);
      }
    });
  });

  describe('test PATCH', () => {
    it('PATCH mission long', async () => {
      const patch = await tryCall(
        'PATCH',
        `/missions/${data2[0].missionId}`,
        patchLong,
      );
      assert.equal(patch.status, 200);

      const get = await tryCall('GET', `/missions/${data2[0].missionId}`);
      assert.equal(patchLong.serviceType, get.data.serviceType);
      assert.equal(patchLong.client, get.data.client);
      assert.equal(patchLong.pickupPlace, get.data.pickupPlace);
      assert.equal(patchLong.dropoffPlace, get.data.dropoffPlace);
      assert.equal(patchLong.hireDate, get.data.hireDate);
      assert.equal(patchLong.hireEnd, get.data.hireEnd);
      assert.equal(patchLong.hireEnd, get.data.hireEnd);
      assert.equal(patchLong.operator, get.data.operator);
      assert.equal(patchLong.destProv, get.data.destProv);
      assert.equal(patchLong.department, get.data.department);
      assert.equal(patchLong.refClient, get.data.refClient);
      assert.equal(patchLong.internalObservation, get.data.internalObservation);
      assert.equal(patchLong.orderCanal, get.data.orderCanal);
      assert.equal(patchLong.contact, get.data.contact);
      assert.equal(patchLong.serviceLabel, get.data.serviceLabel);
      assert.equal(
        patchLong.advertisedPriceExclVAT,
        get.data.advertisedPriceExclVAT,
      );
      assert.equal(
        patchLong.advertisedPriceInclVAT,
        get.data.advertisedPriceInclVAT,
      );
      assert.equal(
        patchLong.advertisedPriceInfos,
        get.data.advertisedPriceInfos,
      );
      assert.equal(
        new Date(patchLong.flightTime).toTimeString(),
        new Date(get.data.flightTime).toTimeString(),
      );
      assert.equal(
        patchLong.requestedVehicleClass,
        get.data.requestedVehicleClass,
      );
      assert.equal(patchLong.modeTVA, get.data.modeTVA);
      assert.equal(
        patchLong.driverAbilities[0].code,
        get.data.driverAbilities.find(
          (d) => d.code === patchLong.driverAbilities[0].code,
        ).code,
      );
      assert.equal(
        patchLong.clientInstructions[0].code,
        get.data.clientInstructions.find(
          (d) => d.code === patchLong.clientInstructions[0].code,
        ).code,
      );
    });

    it('PATCH mission short', async () => {
      const patch = await tryCall(
        'PATCH',
        `/missions/${data2[0].missionId}`,
        patchShort,
      );

      const get = await tryCall('GET', `/missions/${data2[0].missionId}`);
      assert.equal(patch.status, 200);
      assert.equal(patchShort.contact, get.data.contact);
      assert.equal(patchShort.serviceLabel, get.data.serviceLabel);
      assert.equal(patchShort.hireDate, get.data.hireDate);
      assert.equal(patchShort.subcontractorId, get.data.subcontractorId);
      assert.equal(patchShort.orderCanal, get.data.orderCanal);
      assert.equal(
        patchShort.driverAbilities[0].code,
        get.data.driverAbilities.find(
          (d) => d.code === patchShort.driverAbilities[0].code,
        ).code,
      );
    });

    it('PATCH mission with null values', async () => {
      const patch = await tryCall(
        'PATCH',
        `/missions/${data2[0].missionId}`,
        patchNullValues,
      );

      const get = await tryCall('GET', `/missions/${data2[0].missionId}`);
      assert.equal(patch.status, 200);
      assert.equal(patchNullValues.refClient, get.data.refClient);
      assert.equal(patchNullValues.travelDetails, get.data.travelDetails);
      assert.equal(patchNullValues.destProv, get.data.destProv);
      assert.equal(patchNullValues.flightTime, get.data.flightTime);
      assert.equal(patchNullValues.observation, get.data.observation);
      assert.equal(patchNullValues.internalObservation, get.data.observation);
      assert.equal(
        patchNullValues.advertisedPriceExclVAT,
        get.data.advertisedPriceExclVAT,
      );
      assert.equal(
        patchNullValues.advertisedPriceInclVAT,
        get.data.advertisedPriceInclVAT,
      );
      assert.equal(
        patchNullValues.advertisedPriceInfos,
        get.data.advertisedPriceInfos,
      );
    });

    it('PATCH same mission again with not null values', async () => {
      const patch = await tryCall(
        'PATCH',
        `/missions/${data2[0].missionId}`,
        patchNullValues2,
      );

      const get = await tryCall('GET', `/missions/${data2[0].missionId}`);
      assert.equal(patch.status, 200);
      assert.equal(patchNullValues2.refClient, get.data.refClient);
      assert.equal(patchNullValues2.travelDetails, get.data.travelDetails);
      assert.equal(patchNullValues2.destProv, get.data.destProv);
      assert.equal(
        new Date(patchNullValues2.flightTime).toTimeString(),
        new Date(get.data.flightTime).toTimeString(),
      );
      assert.equal(patchNullValues2.observation, get.data.observation);
      assert.equal(patchNullValues2.internalObservation, get.data.observation);
      assert.equal(
        patchNullValues2.advertisedPriceExclVAT,
        get.data.advertisedPriceExclVAT,
      );
      assert.equal(
        patchNullValues2.advertisedPriceInclVAT,
        get.data.advertisedPriceInclVAT,
      );
      assert.equal(
        patchNullValues2.advertisedPriceInfos,
        get.data.advertisedPriceInfos,
      );
    });
  });

  // describe('test GET patched missions', () => {
  //   it('GET mission mini', async () => {
  //     const get = await tryCall('POST', `/missions/${data2[0].missionId}`);
  //     assert.deepEqual(get.data, updatedObject(data2[0], patchLong));
  //   });
  //   it('GET mission full with passengerId', async () => {
  //     const get = await tryCall('POST', `/missions/${data2[1].missionId}`);
  //     assert.deepEqual(get.data, updatedObject(data2[1], patchLong));
  //   });
  // });
}

describe('test GET many missions', () => {
  it('GET many missions', async () => {
    const get = await tryCall(
      'GET',
      '/missions',
      {},
      {
        dayStart: '2020-06-01',
        dayEnd: '2020-06-03',
      },
    );
    get.data.forEach((mission) => {
      expect(mission.missionId).to.be.a('number');
      expect(mission.client).to.be.a('string');
      expect(mission.bookingNumber).to.not.be.an('undefined');
      expect(mission.hireNumber).to.not.be.an('undefined');
      expect(mission.pickupPlace).to.be.a('string');
      expect(mission.hireDate).to.not.be.an('undefined');
      expect(mission.hireEnd).to.not.be.an('undefined');
      expect(mission.serviceType).to.be.a('string');
      expect(mission.serviceLabel).to.not.be.an('undefined');
      expect(mission.department).to.be.a('string');
      expect(mission.dropoffPlace).to.not.be.an('undefined');
      expect(mission.pax).to.not.be.an('undefined');
      expect(mission.refClient).to.not.be.an('undefined');
      expect(mission.travelDetails).to.not.be.an('undefined');
      expect(mission.destProv).to.not.be.an('undefined');
      expect(mission.observation).to.not.be.an('undefined');
      expect(mission.requestedVehicleClass).to.not.be.an('undefined');
      expect(mission.missionGroupId).to.not.be.an('undefined');
      expect(mission.modeTVA).to.not.be.an('undefined');
      expect(mission.state).to.not.be.an('undefined');
      expect(mission.modeTVA).to.not.be.an('undefined');
      expect(mission.internalObservation).to.not.be.an('undefined');
      expect(mission.contact).to.not.be.an('undefined');
      expect(mission.salesRep).to.not.be.an('undefined');
      expect(mission.transportType).to.not.be.an('undefined');
      expect(mission.orderCanal).to.not.be.an('undefined');
      expect(mission.flightTime).to.not.be.an('undefined');
      expect(mission.driverId).to.be.an('undefined');
      expect(mission.currentAmountExVAT).to.not.be.an('undefined');
      expect(mission.currentAmountInVAT).to.not.be.an('undefined');
      expect(mission.billedAmountExVAT).to.not.be.an('undefined');
      expect(mission.billedAmountInVAT).to.not.be.an('undefined');
      expect(mission.fareReference).to.not.be.an('undefined');
      expect(mission.subcontractorId).to.not.be.an('undefined');
      expect(mission.clientInstructions).to.be.an('array');
      expect(mission.driverAbilities).to.be.an('array');

      // Vehicle info
      expect(mission.vehicle).to.not.be.an('undefined');
      expect(mission.vehicle.vehicleId).to.not.be.an('undefined');
      expect(mission.vehicle.modelName).to.not.be.an('undefined');
      expect(mission.vehicle.registration).to.not.be.an('undefined');
    });
  });
});

function testUnmountMissions() {
  describe('test CANCEL mission', () => {
    it('Should cancel missions (cancelled by client)', async () => {
      const patch = await tryCall(
        'PATCH',
        `/missions/${data1[0].missionId}/cancel`,
        cancelMissionLong,
      );
      assert.equal(patch.status, 204);

      const get = await tryCall('GET', `/missions/${data1[0].missionId}`);
      assert.equal(6, get.data.state);
    });

    it('Should cancel missions (canceled by chabé)', async () => {
      const patch2 = await tryCall(
        'PATCH',
        `/missions/${data1[0].missionId}/cancel`,
        cancelMissionShort,
      );
      assert.equal(patch2.status, 204);

      const get2 = await tryCall('GET', `/missions/${data1[0].missionId}`);
      assert.equal(5, get2.data.state);
    });
  });
}

module.exports = { testMountMissions, testUnmountMissions };
