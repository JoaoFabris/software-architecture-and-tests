const sinon = require('sinon'); // O Sinon é um pacote open-source que facilita os testes em JavaScript
const { expect } = require('chai'); // pra ver se retorna aquilo que estamos esperando
const { allDrivers,
     driverIdFromDB, driverIdFromModel } = require('../mocks/driver.mock');
/* const { allPassengers } = require('../mocks/passenger.mock'); */

const DriverModel = require('../../../src/models/driver.model');
const connection = require('../../../src/models/connection');

describe('Testando a model da drivers', function () {
    it('Testar para ver retorna todos os drviers', async function () {
        sinon.stub(connection, 'execute').resolves([allDrivers]);

        const result = await DriverModel.findAll();
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(6);
        expect(result).to.be.deep.equal(allDrivers);
    });

    it('Testar o GET by Id', async function () {
        sinon.stub(connection, 'execute').resolves([[allDrivers[0]]]);

        const result = await DriverModel.findById(1);

        expect(result).to.be.deep.an('object');
        expect(result).to.be.deep.equal(
            { id: 1, name: 'Liana Cisneiros' },
        );
    });
    it.only('testar insert driver', async function () {
        sinon.stub(connection, 'execute').resolves([driverIdFromDB]);

        const inputData = { name: 'João Fabris' };
        const result = await DriverModel.insert(inputData);
        expect(result).to.equal(driverIdFromModel);
  });
  afterEach(function () {
    sinon.restore();
});
});