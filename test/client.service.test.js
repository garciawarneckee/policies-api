'use strict';

const chai = require('chai');
const axios = require('axios');
const rewire = require('rewire');
const MockAdapter = require('axios-mock-adapter');
const expect = chai.expect;

const config = require("../config");
const clientService = rewire('../src/clients/client.service');

const ExternalServiceError = require('../src/exceptions').ExternalServiceError;
const NotClientFoundError = require('../src/exceptions').NotClientFoundError;

describe('ClientService Unit tests', () => {
    
    let axiosMock;
    const mockClient =  {  
        "id":"mockId",
        "name":"Mock",
        "email":"mock@mock.com",
        "role":"mockRole"
     }

    beforeEach(() => {  axiosMock = new MockAdapter(axios);  })

    after(() => { axiosMock.restore(); })

    describe('#getAllByName', () => {
        
        it('should return a mockClient', async () => {
            axiosMock.onGet(config.clientsEndpoint).reply(200, { clients: [mockClient] });
            const client = await clientService.getByName("Mock");
            expect(client).to.eql(mockClient);
        });
    })

})