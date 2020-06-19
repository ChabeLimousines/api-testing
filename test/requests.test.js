// const { testMountPlaces, testUnmountPlaces } = require('./missions/places.missions.test');
// const { testMountPassenger, testUnmountPassenger } = require('./missions/passenger.missions.test');
const { testMountRequest, testUnmountRequest } = require('./requests/request.test');

// describe('Mount Places', () => {
//   testMountPlaces();
// });
// describe('Mount Passenger', () => {
//   testMountPassenger();
// });
describe('Mount Requests', () => {
  testMountRequest();
});

describe('Unmount Requests', () => {
  testUnmountRequest();
});
// describe('Unmount Passenger', () => {
//   testUnmountPassenger();
// });
// describe('Unmount Places', () => {
//   testUnmountPlaces();
// });
