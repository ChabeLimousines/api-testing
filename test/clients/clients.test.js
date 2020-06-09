const { assert, expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');

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
