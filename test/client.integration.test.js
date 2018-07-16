'use strict';

const server = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Client API Integration Tests', function() {
  // TODO: Ask for test client and policy in external API's. 
  // This is to prevent tests failure with possible changes in production data.
  const client = {
    id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
    name: 'Manning',
    email: 'manningblankenship@quotezart.com',
    role: 'admin'
  }
  const policy = {
    id: '64cceef9-3a01-49ae-a23b-3761b604800b'
  }
  describe('#GET / Client', function() { 
    it('should get the Client by Id', function(done) { 
      request(server).get(`/clients/${client.id}`)
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.eql(client);
          done(); 
        }); 
    });
    it('should get the Client by Name', function(done) {
      request(server).get(`/clients/?name=${client.name}`)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.eql(client);
        done(); 
      }); 
    });
    it('should get the Client by Policy Number', function(done) {
      request(server).get(`/clients/policy/${policy.id}`)
        .end(function(err, res) { 
          expect(res.body).to.eql(client);
          done(); 
        }); 
    });
  });
});
