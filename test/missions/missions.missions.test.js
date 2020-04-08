const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');

describe('MISSIONS API', () => {
  describe('test void ressources', () => {
    it('get should return a 404', async () => {
      // const getVoid = await tryCall('GET', '/vehicles/models/NOPENOPE');
      // assert.equal(getVoid.status, 404);
    });
    it('delete should return a 404', async () => {
    });
    it('patch should return a 404', async () => {
    });
  });


  describe('test POST incorrects', () => {
    it('No clientId, should 400', async () => {
    });
    it('No pickup place, should 400', async () => {
    });
    it('No typePresta, should 400', async () => {
    });
    it('No passenger, should 400', async () => {
    });
    it('Passenger both new and with id, should 400', async () => {
    });
  });

  describe('test POST', () => {
    it('POST mission mini', async () => {
    });
    it('POST mission full with passengerId', async () => {
    });
    it('POST mission full with new passenger', async () => {
    });
  });

  describe('test GET existing missions', () => {
    it('GET mission mini', async () => {
    });
    it('GET mission full with passengerId', async () => {
    });
    it('GET mission full with new passenger', async () => {
    });
  });

  describe('test PATCH', () => {
    it('PATCH mission mini', async () => {
    });
    it('PATCH mission full with passengerId', async () => {
    });
    it('PATCH mission full with new passenger', async () => {
    });
  });

  describe('test GET patched missions', () => {
    it('GET mission mini', async () => {
    });
    it('GET mission full with passengerId', async () => {
    });
    it('GET mission full with new passenger', async () => {
    });
  });
});
