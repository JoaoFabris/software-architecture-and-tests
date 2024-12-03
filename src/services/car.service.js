const { carModel, driverModel } = require('../models');
const { validateNewCar } = require('./validation/validationInputValues');

const driverExists = async (driverId) => {
  const driver = await driverModel.findById(driverId);
  return driver || false;
};

const createCar = async ({ model, licensePlate, year, color, driverId }) => {
  const error = validateNewCar({ model, licensePlate, year, color, driverId });
  if (error) return { status: error.status, data: { message: error.message } };

  const driver = await driverExists(driverId);
  if (!driver) return { status: 'NOT_FOUND', data: { message: 'Driver not found' } };

  const carId = await carModel.insert({ model, licensePlate, year, color, driverId });
  const newCar = { id: carId, model, licensePlate, year, color, driverId };
  return { status: 'SUCCESSFUL', data: newCar };
};

const findAll = async () => {
  const cars = await carModel.findAll();
  return { status: 'SUCCESSFUL', data: cars };
};

module.exports = {
  driverExists,
  createCar,
  findAll,
};