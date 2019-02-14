'use strict';

const chai = require('chai');
const axios = require('axios');
const rewire = require('rewire');
const MockAdapter = require('axios-mock-adapter');
const expect = chai.expect;

const config = require("../config");
const policyService = rewire('../src/policies/policy.service');

const ExternalServiceError = require('../src/exceptions').ExternalServiceError;
const PaginationError = require('../src/exceptions').PaginationError;
const PolicyNotFoundError = require('../src/exceptions').PolicyNotFoundError;

describe('PolicyService Unit tests', () => {

	const policiesMockResponse = [
		{
			id: "mockId1",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId2",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId3",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId4",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId5",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId6",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId7",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId8",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId9",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId10",
			amountInsured: 1825.89,
			email: "mockEmail",
			inceptionDate: "2016-06-01T03:33:32Z",
			installmentPayment: true,
			clientId: "mockClientId"
		},
		{
			id: "mockId11",
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

	afterEach(() => {
		axiosMock.restore();
	})

	describe('#getAllByClientId', () => {

		it('should return a page of policies', async () => {
			axiosMock.onGet(config.policiesEndpoint).reply(200, { policies: policiesMockResponse });

			const response = await policyService.getAllByClientId("mockClientId", 0, 10);
			expect(response.content).to.have.length(10);
			expect(response.offset).to.eql(0);
			expect(response.quantity).to.eql(10);
			expect(response.total).to.eql(policiesMockResponse.length);
		});

		it('should return an PaginationError when pagination fails', async () => {
			axiosMock.onGet(config.policiesEndpoint).reply(200, { policies: policiesMockResponse });
			policyService.__with__('buildPage', () => { throw new PaginationError('Pagination Error'); })
			try {
				await policyService.getAllByClientId("mockClientId", 0, 10);
			} catch (error) {
				expect(error.constructor).to.equal(PaginationError);
				expect(error.message).to.equal('Pagination Error');
			}
		});

		it('should return an ExternalServiceError data fetching fails', async () => {
			axiosMock.onGet(config.policiesEndpoint).reply(500, { message: "error getting data" });
			try {
				await policyService.getAllByClientId("mockClientId", 0, 10);
			} catch (error) {
				expect(error.constructor).to.equal(ExternalServiceError);
				expect(error.message).to.equal('An error has happend trying to get the policies');
			}
		});
	})

	describe('#getById', () => {

		it('should return a policy by its id', async () => {
			
			const expectedPolicy = {
				id: "mockId7",
				amountInsured: 1825.89,
				email: "mockEmail",
				inceptionDate: "2016-06-01T03:33:32Z",
				installmentPayment: true,
				clientId: "mockClientId"
			};

			axiosMock.onGet(config.policiesEndpoint).reply(200, { policies: policiesMockResponse });
			const policy = await policyService.getById("mockId7");
			expect(policy).to.eql(expectedPolicy);
		});

		it('should return an PolicyNotFoundError when there is no policy for the provided id', async () => {
			axiosMock.onGet(config.policiesEndpoint).reply(200, { policies: policiesMockResponse });
			try {
				await policyService.getById("notExistingId");
			} catch (error) {
				expect(error.constructor).to.equal(PolicyNotFoundError);
				expect(error.message).to.equal('Policy with id notExistingId does not exist.');
			}
		});

		it('should return an ExternalServiceError when there is an error while fetching data', async () => {
			axiosMock.onGet(config.policiesEndpoint).reply(500, { message: 'External error happened' });
			try {
				await policyService.getById("notExistingId");
			} catch (error) {
				expect(error.constructor).to.equal(ExternalServiceError);
				expect(error.message).to.equal('An error has happend trying to get the policies');
			}
		});

	});

	describe('#buildPage', () => {

		it('should return a page structure when right data is provided', () => {
			const pageData = policyService.__get__('buildPage')(policiesMockResponse, 0, 10);
			expect(pageData.content).to.have.length(10);
			expect(pageData.offset).to.eql(0);
			expect(pageData.quantity).to.eql(10);
		});
		
	})

})

