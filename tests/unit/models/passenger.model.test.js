const sinon = require('sinon'); // pra fazer o mock
const { expect } = require('chai'); // pra ver se retorna aquilo que estamos esperando
const { allPassengers } = require('../mocks/passenger.mock');

const PassengerModel = require('../../../src/models/passenger.model');
const connection = require('../../../src/models/connection');

describe('Testando a model da pessoa passageira', function () {
  afterEach(function () {
    sinon.restore(); // Restaura o stub após cada teste
  });

  it('Testar se retorna todos os passageiros', async function () {
    sinon.stub(connection, 'execute').resolves([[allPassengers]]);

    const result = await PassengerModel.findAll();

    expect(result).to.be.deep.equal(allPassengers);
  });

  it('Testar o retorno do GET por ID', async function () {
    // Configura o stub para simular o retorno esperado
    sinon.stub(connection, 'execute').resolves([[allPassengers[0]]]);

    const result = await PassengerModel.findById(3);

    // Verifica se o retorno está correto
    expect(result).to.be.deep.equal({
      id: 1,
      name: 'Doriana Quintal',
      email: 'doriana.quintal@acme.com',
      phone: '(49) 3882-3117',
    });
  });
});
