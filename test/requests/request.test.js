const assert = require('assert');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const tryCall = require('../../utils/tryCall.utils');
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
requestPostIn.request[0].passenger.passengerId = passFull.passengerId;
requestPostIn.request[0].passenger.passengerId = passMin.passengerId;


function testMountRequest() {
  describe('test bad requests data', () => {
    it('should return a 400 incorrect id', async () => {
      const getVoid = await tryCall('GET', '/requests/0', {}, { client });
      assert.equal(getVoid.status, 400);
    });
    it('should return a 400 incorrect id', async () => {
      const getVoid = await tryCall('POST', '/requests/0/modify', {}, { client });
      assert.equal(getVoid.status, 400);
    });
    it('should return a 400 incorrect id', async () => {
      const getVoid = await tryCall('POST', '/requests/0/cancel', {}, { client });
      assert.equal(getVoid.status, 400);
    });
    it('GET should return a 404', async () => {
      const getVoid = await tryCall('GET', `/requests/${voidRequestId}`, {}, { client });
      assert.equal(getVoid.status, 404);
    });
    it('POST update should return a 404', async () => {
      const getVoid = await tryCall('POST', `/requests/${voidRequestId}/modify`, {}, { client });
      assert.equal(getVoid.status, 404);
    });
    it('POST cancel should return a 404', async () => {
      const getVoid = await tryCall('POST', `/requests/${voidRequestId}/cancel`, {}, { client });
      assert.equal(getVoid.status, 404);
    });
    it('Empty request should 400', async () => {
      const getVoid = await tryCall('POST', '/requests', requestPostEmpty, { client });
      assert.equal(getVoid.status, 400);
    });
  });

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
      assert.equal(getRequest.data.externalId, requestPostIn.externalId);
      assert.equal(getRequest.data.requestId, requestPostIn.requestId);
      assert.equal(getRequest.data.tempOBid, requestPostIn.tempOBid);
      assert.equal(getRequest.data.status, 0);
      expect(getRequest.data.modifRequest).to.be.an('array');
      expect(getRequest.data.modifRequest).to.have.length(1);
      expect(getRequest.data.modifRequest[0].client).to.equal(requestPostIn.request[0].client);
      expect(getRequest.data.modifRequest[0].contactName)
        .to.equal(requestPostIn.request[0].contactName);
      expect(getRequest.data.modifRequest[0].dateSubmission).to.be.a('string');
      expect(getRequest.data.modifRequest[0].dropOffPlace).to.be.an('object');
      expect(getRequest.data.modifRequest[0].dropOffPlace.placeId)
        .to.equal(requestPostIn.request[0].dropOffPlace.placeId);
      expect(getRequest.data.modifRequest[0].hireDate).to.equal(requestPostIn.request[0].hireDate);
      expect(getRequest.data.modifRequest[0].hireEnd).to.equal(requestPostIn.request[0].hireEnd);
      expect(getRequest.data.modifRequest[0].modifRequestId).to.be.a('string');
      expect(getRequest.data.modifRequest[0].observation)
        .to.equal(requestPostIn.request[0].observation);
      expect(getRequest.data.modifRequest[0].passenger).to.be.an('object');
      expect(getRequest.data.modifRequest[0].passenger.passengerId)
        .to.equal(requestPostIn.request[0].passenger.passengerId);
      expect(getRequest.data.modifRequest[0].pax).to.equal(requestPostIn.request[0].pax);
      expect(getRequest.data.modifRequest[0].pickupPlace).to.be.an('object');
      expect(getRequest.data.modifRequest[0].pickupPlace.textAddress)
        .to.equal(requestPostIn.request[0].pickupPlace.textAddress);
      expect(getRequest.data.modifRequest[0].requestedVehicleClass)
        .to.equal(requestPostIn.request[0].requestedVehicleClass);
      expect(getRequest.data.modifRequest[0].status).to.equal(0);
      expect(getRequest.data.modifRequest[0].typeModifRequest).to.equal(0);
      expect(getRequest.data.modifRequest[0].typePresta)
        .to.equal(requestPostIn.request[0].typePresta);
    });
    it('Should get this request by OB id', async () => {
      const getRequest2 = await tryCall('GET', `/requests/byOBid/${requestPostIn.tempOBid}`, {}, { client });
      assert.equal(getRequest2.status, 200);
      assert.equal(getRequest2.data.requestId, requestPostIn.requestId);
    });
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
