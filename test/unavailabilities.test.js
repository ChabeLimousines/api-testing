const assert =require('assert');
const GWCaller = require('../services/GWCaller')
const gwCaller = new GWCaller();

describe('Test unavailabilities API', () => {

  const testUnav = {
    idUnavailability: "RES2",
    type: "REPARATION",
    startDate: "2020-03-15 14:00:00",
    endDate: "2020-03-16 18:30:00",
    informations: "truc truc"
  };
  const testUpdate = {
    informations: "truc2",
    endDate: "2020-03-16 10:30:00",
  };
  const vehicleId = 'RESERVED1';

  describe('POST', () => {
    it('should post unav', async () => {
      const postUnav = await gwCaller.call(
        'POST', `/vehicles/${vehicleId}/unavailabilities/`, {}, {}, testUnav,
      );  
      assert.deepEqual(postUnav.data.unavailability, testUnav);
    });
  });

  describe('GET MANY UNAV', () => {
    it('should return the unav', async () => {
      const getManyUnav = await gwCaller.call(
        'GET', `/vehicles/${vehicleId}/unavailabilities/`,
        { 
          from: "2019-01-01 14:00:00",
          to: "2020-12-30 18:30:00",
        } , {}, {},
      );
      assert(
        getManyUnav.data.find(unav => unav.idUnavailability === testUnav.idUnavailability) !== undefined,
        'Unavailability succesffully removed',
      );
    });
  });
  
  describe('GET', () => {
    it('should get the unav', async () => {
      const postUnav = await gwCaller.call(
        'GET', `/vehicles/${vehicleId}/unavailabilities/${testUnav.idUnavailability}`, {}, {}, {},
      );  
      assert.deepEqual(postUnav.data, {
        idUnavailability: testUnav.idUnavailability.toUpperCase(),
        vehicleId: vehicleId.toUpperCase(),
        type: testUnav.type.toUpperCase(),
        startDate: testUnav.startDate,
        endDate: testUnav.endDate,
        informations: testUnav.informations.toUpperCase(),
      });
    });
  });

  describe('PATCH', () => {
    it('should update the unav', async () => {
      const patchUnav = await gwCaller.call(
        'PATCH', `/vehicles/${vehicleId}/unavailabilities/${testUnav.idUnavailability}`, {}, {}, testUpdate,
      );  
      assert.equal(patchUnav.data.message, 'Unavailability succesffully updated');
    });
  });

  describe('GET', () => {
    it('should return the updated unav', async () => {
      const getUnav = await gwCaller.call(
        'GET', `/vehicles/${vehicleId}/unavailabilities/${testUnav.idUnavailability}`, {}, {}, {},
      );
      Object.keys(testUpdate).forEach(key => {
        if(typeof testUpdate[key] === 'string') {
          assert.equal(getUnav.data[key], testUpdate[key].toUpperCase());
        } else {
          assert.equal(getUnav.data[key], testUpdate[key]);
        }
      });
    });
  });

  describe('DELETE', () => {
    it('should delete model or the ID is free', async () => {
      const delVehi = await gwCaller.call(
        'DELETE', `/vehicles/${vehicleId}/unavailabilities/${testUnav.idUnavailability}`, {}, {}, {},
      );
      assert.equal(delVehi.data.message, 'Unavailability succesffully removed');
    });
  });

});