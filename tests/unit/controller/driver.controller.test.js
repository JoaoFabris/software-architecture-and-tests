const chai = require('chai');
const sinon = require('sinon');

const { driverController } = require('../../../src/controller');
const { driverService } = require('../../../src/services');

const { expect } = chai;

const {
    driversFromServiceSuccessful, allDrivers, 
    driversFromServiceSuccessfulId,
    driverFromServiceNotFound,
    driverFromServiceCreated,
    driverFromServiceInvalidValue,
    newDriver,
  } = require('../mocks/driver.mock');

describe('Realizando testes - DRIVER CONTROLLER:', function () {  
    it('Recuperando drivers com sucesso - status 200', async function () {
        sinon.stub(driverService, 'findAll').resolves(driversFromServiceSuccessful);
    
        const req = { params: { }, body: { } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findAllDrivers(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
        expect(res.json.getCall(0).args[0]).to.deep.equal(allDrivers);
        expect(res.json).to.have.been.calledWith(allDrivers);
      });

      it('Recuperando driver por id com sucesso - status 200', async function () {
        sinon.stub(driverService, 'findById').resolves(driversFromServiceSuccessfulId);

        const response = { id: 1, name: 'Liana Cisneiros' };
    
        const req = { params: { id: 1 }, body: { } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(response);
      });

      it('Driver não encontrado - status 404', async function () {
        sinon.stub(driverService, 'findById').resolves(driverFromServiceNotFound);

        const req = { params: { id: 9 }, body: { } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findById(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'message' });
      });

      it.only('Inserindo driver com sucesso - status 201', async function () {
        sinon.stub(driverService, 'createDriver').resolves(driverFromServiceCreated);
    
        const req = {
          params: { },
          body: { name: 'João Fabris' },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.createDriver(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newDriver);
      });

      afterEach(function () {
        sinon.restore(); // Isso evita interferências entre os testes, tornando-os independentes.
    });    
  });  