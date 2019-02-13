'use strict';

const chai = require('chai');
const axios = require('axios');
const rewire = require('rewire');
const MockAdapter = require('axios-mock-adapter');
const expect = chai.expect;

const config = require("../config");
const policyService = rewire('../src/policies/policy.service');

const PaginationError = require('../src/exceptions').PaginationError; 

describe('PolicyService Unit tests', () => {
    
    const policiesMockResponse = [
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        },
        {
            id: "mockId",
            amountInsured: 1825.89,
            email: "mockEmail",
            inceptionDate: "2016-06-01T03:33:32Z",
            installmentPayment: true,
            clientId: "mockClientId"
        }
      ]
    let axiosMock;

    beforeEach(() => { 
        axiosMock = new MockAdapter(axios);     
    })

    describe('getAllByClientId', () => {
        
        it('should return a page of policies', async () => {
            axiosMock.onGet(config.policiesEndpoint).reply(200, { policies: policiesMockResponse });

            const response = await policyService.getAllByClientId("mockClientId", 0 ,10);
            expect(response.content).to.have.length(10);
            expect(response.offset).to.eql(0);
            expect(response.quantity).to.eql(10);
        });
    
        it('should return an Error when some error happens in the whole process', async () => {
            axiosMock.onGet(config.policiesEndpoint).reply(200, { policies: policiesMockResponse });
            policyService.__set__('buildPage', () => { throw new PaginationError('Pagination Error'); })
            try {
                await policyService.getAllByClientId("mockClientId", 0 ,10);
            } catch(error) {
                expect(error.message).to.equal('An error has happend trying to get the policies');
            }  
        })
    })

})

