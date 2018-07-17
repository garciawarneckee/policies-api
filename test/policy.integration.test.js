'use strict';

const server = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Policy API Integration Tests', () => {

    // TODO: Ask for test client and policy in external API's. 
    // This is to prevent tests failure with possible changes in production data.
    const client = {  
        "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
        "name":"Britney",
        "email":"britneyblankenship@quotezart.com",
        "role":"admin"
     }

    const policy = {
      id: '64cceef9-3a01-49ae-a23b-3761b604800b'
    }
    describe('#GET / Policy', () => { 
      
      it('should get policies by name', (done) => { 
        request(server).get(`/policies/?name=${client.name}&offset=0&quantity=10`)
          .end((err, res) => { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body.content).to.have.length(10);
            expect(res.body.offset).to.eql(0);
            expect(res.body.quantity).to.eql(10);
            done(); 
          }); 
      });

      it('should return 400 when quantity param is not present', (done) => { 
        request(server).get(`/policies/?name=${client.name}&offset=0`)
          .end((err, res) => { 
            expect(res.statusCode).to.equal(400);
            done(); 
          }); 
      });

      it('should return 400 when quantity param is not present', (done) => { 
        request(server).get(`/policies/?name=${client.name}&quantity=10`)
          .end((err, res) => { 
            expect(res.statusCode).to.equal(400);
            done(); 
          }); 
      });
      
      it('should return 400 when name param is not present', (done) => { 
        request(server).get(`/policies/?offset=0&quantity=10`)
          .end((err, res) => { 
            expect(res.statusCode).to.equal(400);
            done(); 
          }); 
      });

    });
  });
  