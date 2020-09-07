const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');

function testMountDrivers() {
  describe('Test incorrects ', () => {
    it('PUT bad request should return a 400', async () => {
      const put = await tryCall('PUT', '/drivers/DJAFFAR/shift');
      assert.equal(put.status, 400);
    });
  });

  describe('Test put driver shift ', () => {
    it('PUT should return a 204', async () => {
      const put = await tryCall('PUT', '/drivers/DJAFFAR/shift', {
        hireDate: '2019-12-12T11:45:00Z',
        hireEnd: '2019-12-12T15:45:00Z',
      });
      assert.equal(put.status, 204);
    });
  });
}

module.exports = {
  testMountDrivers,
};
