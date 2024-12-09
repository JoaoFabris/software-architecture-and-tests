const route = require('express').Router();
const { passengerController } = require('../controller');
const { validateTravelFields } = require('../middleware/validateTravelFields');

    route.post(
        '/:passengerId/request/travel',
        validateTravelFields,
        passengerController.createTravel,
    );

module.exports = route;
