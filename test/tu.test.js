const assert = require('assert');
const { strToUpper, updatedObject } = require('../utils/objects.utils');

const data1 = {
  placeId: 'RESERVedPLACe1',
  address: '92, Addresse de test',
  postalCode: '92000',
  city: 'NANTERRE',
  latitude: 48.890011,
  longitude: 2.197020,
  contry: 'FRANCE',
};
const data2 = {
  placeId: 'RESERVedPLACe1',
  address: '1, Addresse de test',
  latitude: 47.890011,
  longitude: 3.197020,
};
const expected1 = {
  placeId: 'RESERVEDPLACE1',
  address: '92, ADDRESSE DE TEST',
  postalCode: '92000',
  city: 'NANTERRE',
  latitude: 48.890011,
  longitude: 2.197020,
  contry: 'FRANCE',
};
const expected2 = {
  placeId: 'RESERVedPLACe1',
  address: '1, Addresse de test',
  postalCode: '92000',
  city: 'NANTERRE',
  latitude: 47.890011,
  longitude: 3.197020,
  contry: 'FRANCE',
};

describe('Test utils funstions', () => {
  it('should return uppercased object', async () => {
    const res = strToUpper(data1);
    assert.deepEqual(res, expected1);
  });

  it('should return updated object', async () => {
    const res = updatedObject(data1, data2);
    assert.deepEqual(res, expected2);
  });
});
