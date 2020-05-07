const { testMountPlaces, testUnmountPlaces } = require('./missions/places.missions.test');
const { testMountPassenger, testUnmountPassenger } = require('./missions/passenger.missions.test');
const { testMountMissions, testUnmountMissions } = require('./missions/missions.missions.test');

describe('Mount Places', () => {
  testMountPlaces();
});
describe('Mount Passenger', () => {
  testMountPassenger();
});
describe('Mount Missions', () => {
  testMountMissions();
});

describe('Unmount Mission', () => {
  testUnmountMissions();
});
describe('Unmount Passenger', () => {
  testUnmountPassenger();
});
describe('Unmount Places', () => {
  testUnmountPlaces();
});
