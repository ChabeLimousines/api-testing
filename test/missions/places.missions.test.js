const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
const { updatedObject } = require('../../utils/objects.utils');

const placeFull = {
  placeId: 'RESERVedPLACe1',
  address: '92 Addresse de test',
  postalCode: '92000',
  city: 'NANeErrE',
  latitude: 48.890011,
  longitude: 2.197020,
  country: 'FRanCE',
};
const placeMin = {
  placeId: 'reservedPlace2',
};
const placePatchFull = {
  address: '1, Addresse de test',
  latitude: 47.890011,
  longitude: 3.197020,
};
const placePatchMin = {
  address: '2 update test',
};

function testMountPlaces() {
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
        address: '92 Addresse de test',
        postalCode: '92000',
        city: 'NANTERRE',
        latitude: 48.890011,
        longitude: 2.197020,
        country: 'FRANCE',
      });
      assert.equal(post.status, 400);
    });
    it('should 201 POST full body', async () => {
      const post = await tryCall('POST', '/places/', placeFull);
      assert.equal(post.status, 201);
      assert.equal(post.data.placeId, placeFull.placeId.toUpperCase());
    });
    it('should 201 POST min body', async () => {
      const post = await tryCall('POST', '/places/', placeMin);
      assert.equal(post.status, 201);
      assert.equal(post.data.placeId, placeMin.placeId.toUpperCase());
    });
    it('should 409 already posted', async () => {
      const post = await tryCall('POST', '/places/', placeMin);
      assert.equal(post.status, 409);
    });
  });
  describe('GET new places', () => {
    it('should GET full body', async () => {
      const getPlace = await tryCall('GET', `/places/${placeFull.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.equal(getPlace.data.address, placeFull.address);
      assert.equal(getPlace.data.postalCode, placeFull.postalCode.toUpperCase());
      assert.equal(getPlace.data.placeId, placeFull.placeId.toUpperCase());
      assert.equal(getPlace.data.city, placeFull.city.toUpperCase());
      assert.equal(getPlace.data.country.trim(), placeFull.country.toUpperCase());
      expect(getPlace.data.latitude).to.be.closeTo(placeFull.latitude, 0.001);
      expect(getPlace.data.longitude).to.be.closeTo(placeFull.longitude, 0.001);
    });
    it('should GET min body', async () => {
      const getPlace = await tryCall('GET', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, {
        placeId: 'RESERVEDPLACE2',
        address: null,
        postalCode: null,
        city: null,
        latitude: null,
        longitude: null,
        country: null,
      });
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
      const getPlace = await tryCall('GET', `/places/${placeFull.placeId}`);
      const expected = updatedObject(placeFull, placePatchFull);
      assert.equal(getPlace.status, 200);
      assert.equal(getPlace.data.address, expected.address);
      assert.equal(getPlace.data.postalCode, expected.postalCode);
      assert.equal(getPlace.data.placeId, expected.placeId.toUpperCase());
      assert.equal(getPlace.data.city, expected.city.toUpperCase());
      assert.equal(getPlace.data.country.trim(), expected.country.toUpperCase());
      expect(getPlace.data.latitude).to.be.closeTo(expected.latitude, 0.001);
      expect(getPlace.data.longitude).to.be.closeTo(expected.longitude, 0.001);
    });
    it('should GET min body updated', async () => {
      const getPlace = await tryCall('GET', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 200);
      assert.deepEqual(getPlace.data, {
        placeId: 'RESERVEDPLACE2',
        address: '2 update test',
        latitude: null,
        longitude: null,
        postalCode: null,
        city: null,
        country: null,
      });
    });
  });
}

function testUnmountPlaces() {
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
      const getPlace = await tryCall('GET', `/places/${placeFull.placeId}`);
      assert.equal(getPlace.status, 404);
    });
    it('GET deleted should 404', async () => {
      const getPlace = await tryCall('GET', `/places/${placeMin.placeId}`);
      assert.equal(getPlace.status, 404);
    });
  });
}

module.exports = { testMountPlaces, testUnmountPlaces };
