const { testMountPlaces, testUnmountPlaces } = require('./missions/places.missions.test');
const { testSmsConfig, testGetAllPassengers } = require('./clients/clients.test');

describe('Mount Passengers', () => {
    testGetAllPassengers();
});

describe('Mount SMS Config', () => {
    testSmsConfig();
});
