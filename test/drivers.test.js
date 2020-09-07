const { testMountPlaces, testUnmountPlaces } = require('./missions/places.missions.test');
const { testMountDrivers } = require('./drivers/drivers.test');

describe('Mount Drivers', () => {
  testMountDrivers();
});
