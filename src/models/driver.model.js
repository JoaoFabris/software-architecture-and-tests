const camelize = require('camelize');
const connection = require('./connection');

const {
    getFormattedColumnNames,
    getFormattedPlaceholders,
  } = require('../utils/generateFormattedQuery');

const findAll = async () => {
    const [driver] = await connection.execute(
        'SELECT * FROM drivers',
    );
    return camelize(driver);
};

const findById = async (driverId) => {
    const [[driverById]] = await connection.execute(
        'SELECT * FROM drivers WHERE id = ?',
        [driverId],
    );
    
    return camelize(driverById);
};

const insert = async (driver) => {
    const columns = getFormattedColumnNames(driver);
    const placeholders = getFormattedPlaceholders(driver);

    const query = `INSERT INTO drivers (${columns}) VALUES (${placeholders})`;
    const [{ insertId }] = await connection.execute(query, Object.values(driver));
    return insertId;
};

module.exports = {
    findAll,
    findById,
    insert,
};