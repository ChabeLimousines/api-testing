const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');

function testGetAllPassengers(){
  const CLIENT = 'FS';

  describe('Get client passengers with search param', () => {
    it('should return passengers with last name starting by NICO letters', async () => {
      const search = 'NICO';
      const passengers = await tryCall(
        'GET',
        `/clients/${CLIENT}/passengers`,
        {},
        { search },
      );
      assert.equal(passengers.status, 200);

      passengers.data.forEach((p) => expect(p.lastName).to.include(search));
    });
  });
}

function testSmsConfig() {
  describe('Incorrect test', () => {
    it('Bad request GET, Should return a status 401', async () => {
      const client=""
      const getSMSConf = await tryCall(
        'GET', 
        `/clients/${client}/smsConfig`, 
        {},
        {},
      );
      assert.equal(getSMSConf.status, 404);
    });
  });

  describe('Correct test', () => {
    it('Good request GET, Should return the SMS config of the client and status 400', async () => {
      const client="FS"
      const put = await tryCall(
        'GET', 
        `/clients/${client}/smsConfig`, 
        {},
        {},
      );
      assert.equal(put.status, 200);
    });
  });
}

module.exports = {
  testSmsConfig,
  testGetAllPassengers,
};

// Questions for Elie: 
// About the apikey 
//"dd4979cbb09b254dfbcfabf56cc3e55a954a58db3e6e49d8e9b42c0998b1f0a3dfdc6a7a444697d30cc27e3bebf33022911f143f8886301dba6100c9c9d5b37a"