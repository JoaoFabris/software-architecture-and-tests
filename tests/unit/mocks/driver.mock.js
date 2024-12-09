const allDrivers = [
    { id: 1, name: 'Liana Cisneiros' },
    { id: 2, name: 'Fábio Frazão' },
    { id: 3, name: 'Anastácia Bicalho' },
    { id: 4, name: 'Samara Granjeiro' },
    { id: 5, name: 'Levi Teixeira' },
  ]
  
  const allDriversIdInsert = [
    { id: 1, name: 'Liana Cisneiros' },
    { id: 2, name: 'Fábio Frazão' },
    { id: 3, name: 'Anastácia Bicalho' },
    { id: 4, name: 'Samara Granjeiro' },
    { id: 5, name: 'Levi Teixeira' },
    { id: 6, name: 'João Fabris' },
  ]
  const newDriver = {id: 6, name: 'João Fabris'}

  const driverFromServiceNotFound = {
    status: 'NOT_FOUND',
    data: { message: 'message' },
  };

  const driversFromServiceSuccessful = {
    status: 'SUCCESSFUL',
    data: allDrivers,
  };

  const driverFromServiceCreated = {
    status: 'CREATED',
    data: newDriver,
  };
  const driverFromServiceInvalidValue = {
    status: 'INVALID_VALUE',
    data: { message: 'message' },
  };

  const driversFromServiceSuccessfulId = {
    status: 'SUCCESSFUL',
    data: allDrivers[0],
  };
  
  const driverIdFromDB = { insertId: 6 };
  const driverIdFromModel = 6;

  
  module.exports = { allDrivers, allDriversIdInsert, driverIdFromDB, 
    driverIdFromModel, newDriver,
     driversFromServiceSuccessful, driverFromServiceNotFound, driversFromServiceSuccessfulId, 
     driverFromServiceCreated, driverFromServiceInvalidValue };
  