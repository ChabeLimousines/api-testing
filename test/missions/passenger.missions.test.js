const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
const { updatedObject } = require('../../utils/objects.utils');

const passFull = {
  civility: 'Mme & M.',
  lastName: 'D\'aquitaine',
  firstName: 'Eléanore',
  phoneNumber: '0123456789',
};
const passMin = {
  civility: '-',
  lastName: 'DU TEST',
};
const passPatchFull = {
  lastName: 'De bretagne',
  phoneNumber: '0987654321',
};
const passPatchMin = {
  lastName: 'du test 2',
  civility: 'Mrs',
};

function testMountPassenger() {
  describe('test void ressources', () => {
    it('GET should return a 404', async () => {
      const getVoid = await tryCall('GET', '/passenger/0');
      assert.equal(getVoid.status, 404);
    });
    it('PATCH should return a 404', async () => {
      const patchVoid = await tryCall('PATCH', '/passenger/0');
      assert.equal(patchVoid.status, 404);
    });
  });
  describe('POST passengers', () => {
    it('Incorrect civility, should 400', async () => {
      const post = await tryCall('POST', '/passenger/', {
        civility: 'M.',
        lastName: 'Test',
        firstName: 'Test',
      });
      assert.equal(post.status, 400);
    });
    it('should 201 POST full body', async () => {
      const post = await tryCall('POST', '/passenger/', passFull);
      assert.equal(post.status, 201);
      expect(post.data.passengerId).is.a('number');
      passFull.passengerId = post.data.passengerId;
    });
    it('should 201 POST min body', async () => {
      const post = await tryCall('POST', '/passenger/', passMin);
      assert.equal(post.status, 201);
      expect(post.data.passengerId).is.a('number');
      passMin.passengerId = post.data.passengerId;
    });
  });
  describe('GET new passengers', () => {
    it('should GET full body', async () => {
      const getPlace = await tryCall('GET', `/passenger/${passFull.passengerId}`);
      assert.equal(getPlace.status, 200);
      assert.equal(getPlace.data.civility, passFull.civility);
      assert.equal(getPlace.data.lastName, passFull.lastName);
      assert.equal(getPlace.data.firstName, passFull.firstName);
      assert.equal(getPlace.data.phoneNumber, passFull.phoneNumber);
    });
    it('should GET min body', async () => {
      const getPlace = await tryCall('GET', `/passenger/${passMin.passengerId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, {
        civility: passMin.civility,
        lastName: passMin.lastName,
        firstName: null,
        phoneNumber: null,
        passengerId: passMin.passengerId,
      });
    });
  });
  describe('PATCH passenger', () => {
    it('should Patch min body', async () => {
      const patch = await tryCall('PATCH', `/passenger/${passFull.passengerId}`, passPatchFull);
      assert.equal(patch.status, 200);
      assert.equal(patch.data.passengerId, passFull.passengerId);
    });
    it('should Patch full body', async () => {
      const patch = await tryCall('PATCH', `/passenger/${passMin.passengerId}`, passPatchMin);
      assert.equal(patch.status, 200);
      assert.equal(patch.data.passengerId, passMin.passengerId);
    });
  });
  describe('GET patched passenger', () => {
    it('should GET full body updated', async () => {
      const getPass = await tryCall('GET', `/passenger/${passFull.passengerId}`);
      const expected = updatedObject(passFull, passPatchFull);
      assert.equal(getPass.status, 200);
      assert.equal(getPass.data.civility, expected.civility);
      assert.equal(getPass.data.lastName, expected.lastName);
      assert.equal(getPass.data.firstName, expected.firstName);
      assert.equal(getPass.data.phoneNumber, expected.phoneNumber);
    });
    it('should GET min body updated', async () => {
      const getPlace = await tryCall('GET', `/passenger/${passMin.passengerId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, {
        lastName: passPatchMin.lastName,
        civility: passPatchMin.civility,
        firstName: null,
        phoneNumber: null,
        passengerId: passMin.passengerId,
      });
    });
  });
}

function testUnmountPassenger() {
  describe('Delete created passenger', () => {
    it('DELETE full-body should 405', async () => {
      const delPlace = await tryCall('DELETE', `/passenger/${passFull.passengerId}`);
      assert.equal(delPlace.status, 405);
    });
    it('DELETE min-body should return a 200', async () => {
      const delPlace = await tryCall('DELETE', `/passenger/${passMin.passengerId}`);
      assert.equal(delPlace.status, 405);
    });
  });
}

module.exports = { testMountPassenger, testUnmountPassenger };
