const { expect } = require('chai');
const sinon = require('sinon');

const { driverModel } = require('../../../src/models');
const { driverService } = require('../../../src/services');

const { allDrivers } = require('../mocks/driver.mock');

describe('Realizando testes - DRIVER SERVICE', function () {
    it('Retorna todos os drivers', async function () {
        sinon.stub(driverModel, 'findAll').resolves(allDrivers);

        const responseData = [
            { id: 1, name: 'Liana Cisneiros' },
            { id: 2, name: 'Fábio Frazão' },
            { id: 3, name: 'Anastácia Bicalho' },
            { id: 4, name: 'Samara Granjeiro' },
            { id: 5, name: 'Levi Teixeira' },
          ];
          const responseService = await driverService.findAll();
          
          expect(responseService.status).to.be.equal('SUCCESSFUL');
          expect(responseService.data).to.be.an('array');
          expect(responseService.data).to.have.lengthOf(5);
          expect(responseService.data).to.be.deep.equal(responseData);
    });

    it('Retorna o Driver pelo id', async function () {
        sinon.stub(driverModel, 'findById').resolves(allDrivers[0]);

        const responseData = { id: 1, name: 'Liana Cisneiros' };
            
          const responseService = await driverService.findById(1);
          console.log(responseService);
          
          expect(responseService.status).to.be.equal('SUCCESSFUL');
          expect(responseService.data).to.be.an('object');
          expect(responseService.data).to.be.deep.equal(responseData);
    });

    it('Retorna um novo Driver', async function () {
        sinon.stub(driverModel, 'insert').resolves(6); // Supondo que `driverIdFromModel` seja 6
        sinon.stub(driverModel, 'findById').resolves({ id: 6, name: 'João Fabris' });
    
        const responseData = { name: 'João Fabris' };
            
        const responseService = await driverService.createDriver(responseData);
        console.log(responseService);
        
        expect(responseService.status).to.be.equal('SUCCESSFUL');
        expect(responseService.data).to.be.an('object');
        expect(responseService.data).to.be.deep.equal({ id: 6, name: 'João Fabris' });
    });
    afterEach(function () {
        sinon.restore();
    });    
});