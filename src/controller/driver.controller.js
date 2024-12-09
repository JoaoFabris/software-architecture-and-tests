const { driverService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllDrivers = async (_req, res) => {
    console.log('Chamando o serviço...');
    const { status, data } = await driverService.findAll();
    console.log('Recebido do serviço:', data);
    return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await driverService.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

const createDriver = async (req, res) => {
    console.log('Chamando o serviço...');
    const { status, data } = await driverService.createDriver(req.body);
    console.log('Recebido', data);
    
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    findAllDrivers,
    findById,
    createDriver,
};
