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
const client = 'PDG';
const voidRequestId = '1234567890abcdefABCDEF1f';
const requestPostIn = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'request.post.ok.json'), 'utf8'));
const requestPostEmpty = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'request.post.error1.json'), 'utf8'));
console.log(requestPostIn);
// requestPostIn.dropOffPlace.placeId = placeFull.placeId;
// requestPostIn.pickUpPlace.placeId = placeMin.placeId;
requestPostIn.request[0].passenger.passengerId = passFull.passengerId;
requestPostIn.request[0].passenger.passengerId = passMin.passengerId;


function testMountRequest() {
  // describe('test bad requests data', () => {
  //   it('should return a 400 incorrect id', async () => {
  //     const getVoid = await tryCall('GET', '/requests/0', {}, { client });
  //     assert.equal(getVoid.status, 400);
  //   });
  //   it('should return a 400 incorrect id', async () => {
  //     const getVoid = await tryCall('POST', '/requests/0/modify', {}, { client });
  //     assert.equal(getVoid.status, 400);
  //   });
  //   it('should return a 400 incorrect id', async () => {
  //     const getVoid = await tryCall('POST', '/requests/0/cancel', {}, { client });
  //     assert.equal(getVoid.status, 400);
  //   });
  //   it('GET should return a 404', async () => {
  //     const getVoid = await tryCall('GET', `/requests/${voidRequestId}`, {}, { client });
  //     assert.equal(getVoid.status, 404);
  //   });
  //   it('POST update should return a 404', async () => {
  //     const getVoid = await tryCall('POST', `/requests/${voidRequestId}/modify`, {}, { client });
  //     assert.equal(getVoid.status, 404);
  //   });
  //   it('POST cancel should return a 404', async () => {
  //     const getVoid = await tryCall('POST', `/requests/${voidRequestId}/cancel`, {}, { client });
  //     assert.equal(getVoid.status, 404);
  //   });
  //   it('Empty request should 400', async () => {
  //     const getVoid = await tryCall('POST', '/requests', requestPostEmpty, { client });
  //     assert.equal(getVoid.status, 400);
  //   });
  // });

  describe('Creation new request', () => {
    it('Should create a new request', async () => {
      const postedNew = await tryCall('POST', '/requests', requestPostIn, { client });
      assert.equal(postedNew.status, 201);
      expect(postedNew.data.modifRequest).to.not.be.an('undefined');
      expect(postedNew.data.externalId).to.not.be.an('undefined');
      expect(postedNew.data.tempOBid).to.be.a('number');
      expect(postedNew.data.requestId).to.be.a('string');
      requestPostIn.requestId = postedNew.data.requestId;
      requestPostIn.tempOBid = postedNew.data.tempOBid;
      expect(requestPostIn.tempOBid).to.be.a('number');
      expect(requestPostIn.requestId).to.be.a('string');
    });
    it('Should get this request by RequestId', async () => {
      const getRequest = await tryCall('GET', `/requests/${requestPostIn.requestId}`, {}, { client });
      assert.equal(getRequest.status, 200);
      assert.deepEqual(getRequest.data, requestPostIn);
      // todo assert deepequal
    });
    // it('Should get this request by OB id', async () => {
    //   const getVoid = await tryCall('GET', `/requests/byOBid/${requestPostIn.tempOBid}`, { client });
    //   assert.equal(getVoid.status, 200);
    // });
    // it('Should find this request when get by client', async () => {
    //   const getMany = await tryCall('GET', '/requests/byClients/');
    //   assert.equal(getMany.status, 200);
    //   assert.include(getMany, { _id: requestPostIn.requestId });
    // });
  });

  // describe('Incorrect uses of good request', () => {
  //   it('GET without a client should 400', async () => {
  //     const getVoid = await tryCall('GET', `/requests/${requestPostIn.idRequest}`);
  //     assert.equal(getVoid.status, 400);
  //   });
  // });
}

function testUnmountRequest() {

}
module.exports = {
  testMountRequest,
  testUnmountRequest,
};
