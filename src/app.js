const express = require('express');
const { travelModel, passengerModel, driverModel, carModel } = require('./models');
const carService = require('./services/car.service');
const travelService = require('./services/travelService.service');
const { passengerRoute, driverRoute, travelRoute } = require('./routes');

const app = express();

app.use(express.json());
app.use('/passengers', passengerRoute);
app.use('/travels', travelRoute);
app.use('/drivers', driverRoute);

const passengerExists = async (passengerId) => {
  const passenger = await passengerModel.findById(passengerId);
  return passenger || false;
};

app.get('/passengers', async (_req, res) => {
  const passengers = await passengerModel.findAll();
  return res.status(200).json(passengers);
});

app.get('/driver/:driverId', async (req, res) => {
  const { driverId } = req.params;
  const driver = await driverModel.findById(driverId);
  return res.status(200).json(driver);
});

/* app.get('/driver', async (_req, res) => {
  const drivers = await driverModel.findAll();
  return res.status(200).json(drivers);
}); */

app.get('/passengers/:passengerId', async (req, res) => {
  const { passengerId } = req.params;
  const passenger = await passengerModel.findById(passengerId);
  return res.status(200).json(passenger);
});

app.post('/drivers', async (req, res) => {
  try {
      const { name } = req.body;

      if (!name) {
          return res.status(400).json({ message: 'O campo "name" é obrigatório' });
      }

      const insertId = await driverModel.insert({ name });
      return res.status(201).json({ message: 'Registro inserido com sucesso', id: insertId });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao inserir registro', error: error.message });
  }
});

app.post('/passengers/:passengerId/request/travel', async (req, res) => {
  const { passengerId } = req.params;
  const { startingAddress, endingAddress, waypoints } = req.body;

  const passenger = await passengerExists(passengerId);
  if (!passenger) return res.status(404).json({ message: 'Passenger not found' });

  const travelId = await travelModel.insert({
    passengerId,
    startingAddress,
    endingAddress,
    waypoints,
  });
  const newTravel = await travelModel.findById(travelId);

  return res.status(201).json(newTravel);
});

app.get('/drivers/open/travels', async (_req, res) => {
  const serviceResponse = await travelService.getOpenTravels();
  return res.status(200).json(serviceResponse.data);
});

/* app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const updateResult = await connection.execute(
    'UPDATE travels SET driver_id = ? WHERE id = ?', [travelId, driverId],
  )
}); */
app.patch('/drivers/:driverId/travels/:travelId', async (req, res) => {
  const { driverId, travelId } = req.params;
  
  const serviceResponse = await travelService.updateTravelStatus(driverId, travelId);
  
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(422).json(serviceResponse.data);
  }

  return res.status(200).json(serviceResponse.data);
});

app.post('/cars', async (req, res) => {
  const { model, licensePlate, year, color, driverId } = req.body;
  const serviceResponse = await carService.createCar({
    model,
    licensePlate,
    year,
    color,
    driverId,
  });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(422).json(serviceResponse.data);
  }
  return res.status(201).json(serviceResponse.data);
});

app.get('/cars', async (_req, res) => {
  const passengers = await carModel.findAll();
  return res.status(200).json(passengers);
});

module.exports = app;
