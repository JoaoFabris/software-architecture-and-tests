const route = require('express').Router();
const { driverController } = require('../controller');
const { validateDriverFields } = require('../middleware/validateDriverFields');

route.get('/', driverController.findAllDrivers);
route.get('/:id', driverController.findById);
route.post('/', validateDriverFields, driverController.createDriver);

module.exports = route;
