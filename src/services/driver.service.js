const { driverModel } = require('../models');
const schema = require('./validation/validationInputValues');

const findAll = async () => {
    const drivers = await driverModel.findAll();
    return { status: 'SUCCESSFUL', data: drivers };
};

const findById = async (driverId) => {
    const driver = await driverModel.findById(driverId);
    return { status: 'SUCCESSFUL', data: driver };
};

const createDriver = async (driverObject) => {
    const error = schema.validateNewDriver(driverObject);
    if (error) return { status: error.status, data: { message: error.message } };

    const newDriver = await driverModel.insert(driverObject);
    const confirmData = await driverModel.findById(newDriver);
    return { status: 'SUCCESSFUL', data: confirmData };
};

module.exports = {
    findAll,
    findById,
    createDriver,
};