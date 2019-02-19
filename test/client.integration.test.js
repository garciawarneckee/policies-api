'use strict';

const server = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Client API Integration Tests', () => {

	const client = {
		id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
		name: 'Manning',
		email: 'manningblankenship@quotezart.com',
		role: 'admin'
	}

	const policy = {
		id: '64cceef9-3a01-49ae-a23b-3761b604800b'
	}
	
	describe('#GET / Client', () => {

		it('should get the Client by Id', (done) => {
			request(server).get(`/clients/${client.id}`)
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.eql(client);
					done();
				});
		});

		it('should return 404 if there is not client with id', (done) => {
			request(server).get('/clients/fakeClientId')
				.end((err, res) => {
					expect(res.statusCode).to.equal(404);
					done();
				});
		});

		it('should return 400 if there is not clientId in path param', (done) => {
			request(server).get('/clients')
				.end((err, res) => {
					expect(res.statusCode).to.equal(400);
					done();
				});
		});

		it('should get the Client by Name', (done) => {
			request(server).get(`/clients/?name=${client.name}`)
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.eql(client);
					done();
				});
		});

		it('should return 404 if there is not client with provided name', (done) => {
			request(server).get(`/clients/?name=fakeName`)
				.end((err, res) => {
					expect(res.statusCode).to.equal(404);
					done();
				});
		});

		it('should return 400 if there is not client name query search ', (done) => {
			request(server).get(`/clients/?name=`)
				.end((err, res) => {
					expect(res.statusCode).to.equal(400);
					done();
				});
		});

		it('should get the Client by Policy Number', (done) => {
			request(server).get(`/clients/policy/${policy.id}`)
				.end((err, res) => {
					expect(res.body).to.eql(client);
					done();
				});
		});

		it('should return 404 if there is not policy with provided id', (done) => {
			request(server).get(`/clients/policy/fakePolicyId`)
				.end((err, res) => {
					expect(res.statusCode).to.equal(404);
					done();
				});
		});

	});
});
