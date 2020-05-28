const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
const {
  filterCommonKeys,
} = require('../../utils/objects.utils');
// const { passFull, passMin } = require('./passenger.missions.test');
// const { placeFull, placeMin } = require('./places.missions.test');
const placeFull = { placeId: 'CDG' };
const placeMin = { placeId: 'CDG' };
const passFull = { passengerId: 928565 };
const passMin = { passengerId: 928565 };

const requestPostIn = JSON.readFileSync('./data/request.post.in.json');


function testMountRequest() {
  describe('test bad requests data', () => {
    it('GET should return a 404', async () => {
      const getVoid = await tryCall('GET', '/requests/0');
      assert.equal(getVoid.status, 404);
    });
    it('POST update should return a 404', async () => {
      const getVoid = await tryCall('GET', '/requests/0/update');
      assert.equal(getVoid.status, 404);
    });
    it('POST cancell should return a 404', async () => {
      const getVoid = await tryCall('GET', '/requests/0/cancel');
      assert.equal(getVoid.status, 404);
    });
  });

  describe('Creation new request', () => {
    it('Should create a new request', async () => {
      const getVoid = await tryCall('POST', '/requests');
      assert.equal(getVoid.status, 201);
      // todo assert return message ok
    });
    it('Should get this request by RequestId', async () => {
      const getVoid = await tryCall('GET', `/requests/${requestPostIn.requestId}`);
      assert.equal(getVoid.status, 200);
      // todo assert deepequal
    });
    it('Should get this request by OB id', async () => {
      const getVoid = await tryCall('GET', `/requests/byOBid/${requestPostIn.tempOBid}`);
      assert.equal(getVoid.status, 200);
    });
    it('Should find this request when get by client', async () => {
      const getMany = await tryCall('GET', '/requests/byClients/');
      assert.equal(getMany.status, 200);
      assert.include(getMany, { _id: requestPostIn.requestId });
    });
  });

  describe('Incorrect uses of good request', () => {
    it('GET without a client should 400', async () => {
      const getVoid = await tryCall('GET', `/requests/${requestPostIn.idRequest}`);
      assert.equal(getVoid.status, 400);
    });
  });
}

module.exports = testMountRequest;
