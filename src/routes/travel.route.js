const route = require('express').Router();
const { travelController } = require('../controller');

route.get('/open/travels', travelController.openTravels);

module.exports = route;