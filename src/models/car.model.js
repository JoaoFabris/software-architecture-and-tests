// Na model retira o acesso do GET 

const camelize = require('camelize');
const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const insert = async (car) => {
  const columns = getFormattedColumnNames(car);
  const placeholders = getFormattedPlaceholders(car);
  const query = `INSERT INTO cars (${columns}) VALUES (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(car)]);

  return insertId;
};

// retorna todos os carros do bd
const findAll = async () => {
  const [cars] = await connection.execute(
    'SELECT * FROM cars',
  );

  return camelize(cars);
};
// Acha o carro pelo id
const findById = async (carId) => {
  const [[car]] = await connection.execute(
    'SELECT * FROM cars WHERE id = ?',
    [carId],
  );

  return camelize(car);
};

module.exports = {
  insert,
  findAll,
  findById,
};