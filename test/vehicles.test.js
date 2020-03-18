const assert = require('assert');
const GWCaller = require('../services/GWCaller')
const gwCaller = new GWCaller();



// MODELS
const testModel = {
  name: 'resmodel1',
  make: 'MERCEDES',
  category: 'B',
};
const testModelUpper = Object.assign({}, testModel);
Object.keys(testModelUpper).forEach(k => testModelUpper[k] = testModelUpper[k].toUpperCase());

describe('MOUNT MODELS API', () => {
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
      assert.deepEqual(postModel.data.model, testModelUpper);
    });
  });

  describe('GET', () => {
    it('should return the model', async () => {
      const getModel = await gwCaller.call(
        'GET', `/vehicles/models/${testModel.name}`, {}, {}, {},
      );  
      assert.deepEqual(getModel.data, testModelUpper);
    });
  });

  describe('PATCH', () => {
    it('should update the model', async () => {
      const patchModel = await gwCaller.call(
        'PATCH', `/vehicles/models/${testModel.name}`, {}, {}, testUpdate,
      );  
      assert.equal(patchModel.data.message, `Model ${testModelUpper.name} update success`);
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
});

// VEHICLES
const testVehi = {
  vehicleId: "Reserved2",
  registration: "RESERVED2",
  label: "labeL1",
  modelName: testModel.name,
  mileage: 666,
  nbSeats: 0,
  firstRegDate: "2015-01-01",
  initialCalendar: [{
    dateStart: "2020-02-20T10:00:00.000Z",
    dateEnd: "2020-03-19T10:00:00.000Z",
    agency: "CHABE",
}]};

describe('MOUNT VEHICLES API', () => {

  const testUpdate = {
    label: "label2",
    mileage: 777,
    nbSeats: 4,
    firstRegDate: "2014-02-01",
  };
  const vehiId = testVehi.vehicleId.toUpperCase();

  describe('POST', () => {
    it('should synchronize vehicle', async () => {
      const postVehi = await gwCaller.call(
        'POST', '/vehicles/', {}, {}, testVehi,
      );  
      assert.equal(postVehi.data.vehicleId, vehiId);
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
        modelName: testVehi.modelName.toUpperCase(),
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


// UNAVAILABILITIES
const testUnav = {
  idUnavailability: "RES2",
  type: "REPARATION",
  startDate: "2020-03-15 14:00:00",
  endDate: "2020-03-16 18:30:00",
  informations: "truc truc"
};

describe('MOUNT unavailabilities API', () => {

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
    it('should delete unav', async () => {
      const delVehi = await gwCaller.call(
        'DELETE', `/vehicles/${vehicleId}/unavailabilities/${testUnav.idUnavailability}`, {}, {}, {},
      );
      assert.equal(delVehi.data.message, 'Unavailability succesffully removed');
    });
  });

});


describe('UNMOUNT VEHICLES', () => {
  describe('DELETE', () => {
    it('should delete model or the ID is free', async () => {
      try {
        const delVehi = await gwCaller.call(
          'DELETE', `/vehicles/${testVehi.vehicleId}`, {}, {}, {},
        );
        assert.equal(delVehi.data.message, 'Vehicle deleted');
      } catch (e) {
        assert.equal(`Vehicle ${testVehi.vehicleId.toUpperCase()} not found`, e.data.error);
      }
    });
  });
});

describe('UNMOUNT MODELS', () => {
  describe('DELETE', () => {
    it('should delete model', async () => {
      const delModel = await gwCaller.call(
        'DELETE', `/vehicles/models/${testModel.name}`, {}, {}, {},
      );
      assert.equal(delModel.data.message, `Model ${testModelUpper.name} DELETE success`);
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


