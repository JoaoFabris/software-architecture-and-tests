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

  const driverIdFromDB = { insertId: 6 };
  const driverIdFromModel = 6;

  
  module.exports = { allDrivers, allDriversIdInsert, driverIdFromDB, driverIdFromModel };
  