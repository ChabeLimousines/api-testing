const assert = require('assert');
const tryCall = require('../utils/tryCall.utils');

describe('Mount PLACES API', () => {
  describe('test void ressources', () => {
    it('GET should return a 404', async () => {
      // const getVoid = await tryCall('GET', '/vehicles/models/NOPENOPE');
      // assert.equal(getVoid.status, 404);
    });
    it('DELETE should return a 404', async () => {
    });
    it('PATCH should return a 404', async () => {
    });
  });
  describe('POST places', () => {
    it('No placeId, should 400', async () => {
    });
    it('should 200 POST full body', async () => {
    });
    it('should 200 POST min body', async () => {
    });
    it('should 409 already posted', async () => {
    });
  });
  describe('GET new places', () => {
    it('should GET full body', async () => {
    });
    it('should GET min body', async () => {
    });
  });
  describe('PATCH places', () => {
    it('Patch incorrect should 400', async () => {
    });
    it('should Patch min body', async () => {
    });
    it('should Patch full body', async () => {
    });
  });
  describe('GET patched places', () => {
    it('should GET full body', async () => {
    });
    it('should GET min body', async () => {
    });
  });
});

describe('Mount PASSENGER API', () => {
  describe('test void ressources', () => {
    it('GET should return a 404', async () => {
    });
    it('DELETE should return a 404', async () => {
    });
    it('PATCH should return a 404', async () => {
    });
  });
  describe('POST passenger', () => {
    it('Incorrect civility, should 400', async () => {
    });
    it('should 200 POST full body', async () => {
    });
    it('should 200 POST min body', async () => {
    });
    it('should 409 already posted', async () => {
    });
  });
  describe('GET new passenger', () => {
    it('should GET full body', async () => {
    });
    it('should GET min body', async () => {
    });
  });
  describe('patch passenger', () => {
    it('Patch incorrect should 400', async () => {
    });
    it('should Patch min body', async () => {
    });
    it('should Patch full body', async () => {
    });
  });
  describe('GET patched passenger', () => {
    it('should GET full body', async () => {
    });
    it('should GET min body', async () => {
    });
  });
});

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
