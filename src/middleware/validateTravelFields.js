const checkRequiredFields = require('../utils/checkRequiredFields');

const validateTravelWithWaypoints = (waypoints) => {
    const waypointsRequiredFields = ['address', 'stopOrder'];

    for (let i = 0; i < waypoints.length; i += 1) {
        const waypoint = waypoints[i];
        const error = checkRequiredFields(waypoint, waypointsRequiredFields);
        if (error) return error;
    }
};

const validateTravelFields = (req, res, next) => {
    // se existe starting address, ending
    const travelRequiredFields = ['startingAddress', 'endingAddress'];

    const { body } = req;
    const travelError = checkRequiredFields(body, travelRequiredFields);
    if (travelError) return res.status(400).json({ message: travelError });

    const { waypoints } = req;
    if (waypoints) {
        const waypointsError = validateTravelWithWaypoints(waypoints);
        if (waypointsError) return res.status(400).json({ message: waypointsError });
    }
    
    next();
};

module.exports = {
    validateTravelFields,
    validateTravelWithWaypoints,
};