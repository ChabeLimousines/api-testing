const assert = require('assert');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
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

const requestPostIn = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'request.post.in.json'), 'utf8'));
console.log(requestPostIn);
// requestPostIn.dropOffPlace.placeId = placeFull.placeId;
// requestPostIn.pickUpPlace.placeId = placeMin.placeId;
requestPostIn.request[0].passenger.passengerId = passFull;
requestPostIn.request[0].passenger.passengerId = passMin;


function testMountRequest() {
  describe('test bad requests data', () => {
    it('GET should return a 404', async () => {
      const getVoid = await tryCall('GET', '/requests/0');
      assert.equal(getVoid.status, 404);
    });
    it('POST update should return a 404', async () => {
      const getVoid = await tryCall('POST', '/requests/0/update');
      assert.equal(getVoid.status, 404);
    });
    it('POST cancel should return a 404', async () => {
      const getVoid = await tryCall('POST', '/requests/0/cancel');
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

function testUnmountRequest() {

}
module.exports = {
  testMountRequest,
  testUnmountRequest,
};
