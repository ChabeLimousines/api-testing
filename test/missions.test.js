const { testMountPlaces, testUnmountPlaces } = require('./missions/places.missions.test');
const {testMountPassenger, testUnmountPassenger } = require('./missions/passenger.missions.test');

// describe('Mount Places', () => {
//   testMountPlaces();
// });
describe('Mount Passenger', () => {
  testMountPassenger();
});

describe('Unmount Passenger', () => {
  testUnmountPassenger();
});

// describe('Unmount Places', () => {
//   testUnmountPlaces();
// });
