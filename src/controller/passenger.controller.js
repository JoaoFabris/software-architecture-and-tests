const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { travelService } = require('../services');

const createTravel = async (req, res) => {
    const passengerId = req.params;
    const travelData = { passengerId, ...req.body };

    const { status, data } = await travelService.requestTravel(travelData);
    return res.status(mapStatusHTTP(status)).json(data);
};

const openTravels = async (_req, res) => {
    const { status, data } = await travelService.getOpenTravels();
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    createTravel,
    openTravels,
};