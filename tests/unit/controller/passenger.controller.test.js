const chai = require('chai');
const sinon = require('sinon');

(async () => {
  const sinonChai = await import("sinon-chai"); // Importação dinâmica do sinon-chai
  chai.use(sinonChai.default);
})();

const { expect } = chai;

const { travelService, driverService } = require("../../../src/services");
const { passengerController } = require("../../../src/controller");
const {
  travelFromServiceCreated,
  travelFromModel,
  travelFromServiceInvalidValue,
} = require("../mocks/travel.mock");

describe('Realizando testes - PASSENGER CONTROLLER:', function () {
  it('Inserindo travel com sucesso - status 201', async function () {
    sinon
      .stub(travelService, "requestTravel")
      .resolves(travelFromServiceCreated);

    const req = {
      params: { passengerId: 1 },
      body: { startingAddress: "staring street", endingAddress: "end street" },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(travelFromModel);
  });
  it('Não insere travel com params errado - status 422', async function () {
    sinon
      .stub(travelService, "requestTravel")
      .resolves(travelFromServiceInvalidValue);
    const req = {
      params: { passengerId: 0 },
      body: { startingAddress: "starting street", endingAddress: "end street" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has("message"));
  });

  it('Insere com body errado - status 422', async function () {
    sinon
      .stub(travelService, "requestTravel")
      .resolves(travelFromServiceInvalidValue);
    const req = {
      params: { passengerId: 1 },
      body: { startingAddress: "st", endingAddress: "en" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has("message"));
  });

  it('Não insere travel com endereços iguais - status 422', async function () {
    sinon.stub(travelService, 'requestTravel').resolves(travelFromServiceInvalidValue);
    const req = {
      params: { passengerId: 1 },
      body: { startingAddress: 'starting', endingAddress: 'starting' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Recuperando all drivers com sucesso - status 200', async function () {
    sinon.stub(driverService, 'findAll').resolves()
  })

  afterEach(function () {
    sinon.restore();
  });
});
