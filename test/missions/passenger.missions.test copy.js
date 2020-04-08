const assert = require('assert');
const { expect } = require('chai');
const tryCall = require('../../utils/tryCall.utils');
const { updatedObject } = require('../../utils/objects.utils');


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
