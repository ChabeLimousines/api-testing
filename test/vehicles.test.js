const { testMountModels, testUnmountModels } = require('./vehicles/models.vehicles.test');
const { testMountVehicles, testUnmountVehicles } = require('./vehicles/vehicles.vehicles.test');
const { testMountUnavs, testUnmountUnavs } = require('./vehicles/unavailabilities.vehicles.test');

describe('Mount Models', () => {
  testMountModels();
});
// describe('Mount Vehicles', () => {
//   testMountVehicles();
// });
// describe('Mount Unavailabilities', () => {
//   testMountUnavs();
// });
// describe('Unmount Unavailabilities', () => {
//   testUnmountUnavs();
// });
// describe('Unmount Vehicles', () => {
//   testUnmountVehicles();
// });
describe('unmount Models', () => {
  testUnmountModels();
});
