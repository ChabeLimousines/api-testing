const { testMountPlaces, testUnmountPlaces } = require('./missions/places.missions.test');

describe('Mount Places', () => {
  testMountPlaces();
});

describe('Unmount Places', () => {
  testUnmountPlaces();
});
