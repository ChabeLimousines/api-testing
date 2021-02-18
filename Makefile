test-missions:
	mocha test/missions.test.js --timeout 25000
test-vehicles:
	mocha test/vehicles.test.js --timeout 25000
test-vehicles-staging:
	NODE_ENV=staging mocha test/vehicles.test.js --timeout 25000
test-requests:
	mocha test/requests.test.js --timeout 25000
test-drivers:
	mocha test/drivers.test.js --timeout 25000
test-clients:
	mocha test/clients.test.js --timeout 25000
	