const assert = require('assert');
const tryCall = require('../utils/tryCall.utils');
const { strToUpper, updatedObject } = require('../utils/array.utils');

const placeFull = {
  placeId: 'RESERVedPLACe1',
  address: '92, Addresse de test',
  postalCode: '92000',
  city: 'NANTERRE',
  latitude: 48.890011,
  longitude: 2.197020,
  contry: 'FRANCE',
};
const placeMin = {
  placeId: 'reservedPlace2',
};
const placePatchFull = {
  placeId: 'RESERVedPLACe1',
  address: '1, Addresse de test',
  latitude: 47.890011,
  longitude: 3.197020,
};
const placePatchMin = {
  placeId: 'reservedPlace2',
  address: '2 update test',
};

describe('Mount PLACES API', () => {
  describe('test void ressources', () => {
    it('GET should return a 404', async () => {
      const getVoid = await tryCall('GET', '/places/NOPENOPE');
      assert.equal(getVoid.status, 404);
    });
    it('DELETE should return a 404', async () => {
      const delVoid = await tryCall('DELETE', '/places/NOPENOPE');
      assert.equal(delVoid.status, 404);
    });
    it('PATCH should return a 404', async () => {
      const patchVoid = await tryCall('PATCH', '/places/NOPENOPE');
      assert.equal(patchVoid.status, 404);
    });
  });
  describe('POST places', () => {
    it('No placeId, should 400', async () => {
      const post = await tryCall('POST', '/places/', {
        address: '92, Addresse de test',
        postalCode: '92000',
        city: 'NANTERRE',
        latitude: 48.890011,
        longitude: 2.197020,
        contry: 'FRANCE',
      });
      assert.equal(post.status, 400);
    });
    it('should 200 POST full body', async () => {
      const post = await tryCall('POST', '/places/', placeFull);
      assert.equal(post.status, 200);
      assert.equal(post.data.placeId, placeFull.placeId.toUpperCase());
    });
    it('should 200 POST min body', async () => {
      const post = await tryCall('POST', '/places/', placeMin);
      assert.equal(post.status, 200);
      assert.equal(post.data.placeId, placeMin.placeId.toUpperCase());
    });
    it('should 409 already posted', async () => {
      const post = await tryCall('POST', '/places/', placeMin);
      assert.equal(post.status, 409);
    });
  });
  describe('GET new places', () => {
    it('should GET full body', async () => {
      const getPlace = await tryCall('GET', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, strToUpper(placeFull));
    });
    it('should GET min body', async () => {
      const getPlace = await tryCall('GET', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, strToUpper(placeFull));
    });
  });
  describe('PATCH places', () => {
    it('Patch incorrect should 400', async () => {
      const patch = await tryCall('PATCH', `/places/${placeMin.placeId}`, placeMin);
      assert.equal(patch.status, 400);
    });
    it('should Patch min body', async () => {
      const patch = await tryCall('PATCH', `/places/${placeFull.placeId}`, placePatchFull);
      assert.equal(patch.status, 200);
      assert.equal(patch.data.placeId, placeFull.placeId.toUpperCase());
    });
    it('should Patch full body', async () => {
      const patch = await tryCall('PATCH', `/places/${placeMin.placeId}`, placePatchMin);
      assert.equal(patch.status, 200);
      assert.equal(patch.data.placeId, placeMin.placeId.toUpperCase());
    });
  });
  describe('GET patched places', () => {
    it('should GET full body updated', async () => {
      const getPlace = await tryCall('GET', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, strToUpper(updatedObject(placeMin, placePatchMin)));
    });
    it('should GET min body updated', async () => {
      const getPlace = await tryCall('GET', `/places/${placeFull.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, strToUpper(updatedObject(placeFull, placePatchFull)));
    });
  });
});

// describe('Mount PASSENGER API', () => {
//   describe('test void ressources', () => {
//     it('GET should return a 404', async () => {
//     });
//     it('DELETE should return a 404', async () => {
//     });
//     it('PATCH should return a 404', async () => {
//     });
//   });
//   describe('POST passenger', () => {
//     it('Incorrect civility, should 400', async () => {
//     });
//     it('should 200 POST full body', async () => {
//     });
//     it('should 200 POST min body', async () => {
//     });
//     it('should 409 already posted', async () => {
//     });
//   });
//   describe('GET new passenger', () => {
//     it('should GET full body', async () => {
//     });
//     it('should GET min body', async () => {
//     });
//   });
//   describe('patch passenger', () => {
//     it('Patch incorrect should 400', async () => {
//     });
//     it('should Patch min body', async () => {
//     });
//     it('should Patch full body', async () => {
//     });
//   });
//   describe('GET patched passenger', () => {
//     it('should GET full body', async () => {
//     });
//     it('should GET min body', async () => {
//     });
//   });
// });

// describe('MISSIONS API', () => {
//   describe('test void ressources', () => {
//     it('get should return a 404', async () => {
//       // const getVoid = await tryCall('GET', '/vehicles/models/NOPENOPE');
//       // assert.equal(getVoid.status, 404);
//     });
//     it('delete should return a 404', async () => {
//     });
//     it('patch should return a 404', async () => {
//     });
//   });


//   describe('test POST incorrects', () => {
//     it('No clientId, should 400', async () => {
//     });
//     it('No pickup place, should 400', async () => {
//     });
//     it('No typePresta, should 400', async () => {
//     });
//     it('No passenger, should 400', async () => {
//     });
//     it('Passenger both new and with id, should 400', async () => {
//     });
//   });

//   describe('test POST', () => {
//     it('POST mission mini', async () => {
//     });
//     it('POST mission full with passengerId', async () => {
//     });
//     it('POST mission full with new passenger', async () => {
//     });
//   });

//   describe('test GET existing missions', () => {
//     it('GET mission mini', async () => {
//     });
//     it('GET mission full with passengerId', async () => {
//     });
//     it('GET mission full with new passenger', async () => {
//     });
//   });

//   describe('test PATCH', () => {
//     it('PATCH mission mini', async () => {
//     });
//     it('PATCH mission full with passengerId', async () => {
//     });
//     it('PATCH mission full with new passenger', async () => {
//     });
//   });

//   describe('test GET patched missions', () => {
//     it('GET mission mini', async () => {
//     });
//     it('GET mission full with passengerId', async () => {
//     });
//     it('GET mission full with new passenger', async () => {
//     });
//   });
// });

describe('Unmount PLACES API', () => {
  describe('Delete created places', () => {
    it('DELETE full-body should 200', async () => {
      const delPlace = await tryCall('DELETE', `/places/${placeFull.placeId}`);
      assert.equal(delPlace.status, 200);
    });
    it('DELETE min-body should return a 200', async () => {
      const delPlace = await tryCall('DELETE', `/places/${placeMin.placeId}`);
      assert.equal(delPlace.status, 200);
    });
    it('GET deleted should 404', async () => {
      const getPlace = await tryCall('DELETE', `/places/${placeFull.placeId}`);
      assert.equal(getPlace.status, 404);
    });
    it('GET deleted should 404', async () => {
      const getPlace = await tryCall('DELETE', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 404);
    });
  });
});
