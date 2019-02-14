'use strict';

const chai = require('chai');
const request = require('supertest');
const server = require('../app');

const expect = chai.expect;

describe('Auth API Integration Tests', () => {

  const client = {
    id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
    name: 'Manning',
    email: 'manningblankenship@quotezart.com',
    role: 'admin'
  }

  describe('#POST / login ', () => { 
    
    it('should login successful', (done) => { 
      request(server).post(`/auth/login`)
        .send( { username: client.name, password: client.email } )
        .end((err, res) => { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.eql({isLogged: true,  client: { id: client.id, name: client.name, role: client.role }});
          done(); 
        }); 
    });

    it('should return 401 when user or password are wrong', (done) => { 
        request(server).post(`/auth/login`)
          .send( { username: "notExistingUser", password: client.email } )
          .end((err, res) => { 
            expect(res.statusCode).to.equal(401); 
            done(); 
          }); 
    });

    it('should return 400 when user is not present', (done) => { 
      request(server).post(`/auth/login`)
        .send( { password: client.email } )
        .end((err, res) => { 
          expect(res.statusCode).to.equal(400); 
          done(); 
        }); 
  });

  it('should return 400 when user or is not present', (done) => { 
    request(server).post(`/auth/login`)
      .send( { username: "notExistingUser" } )
      .end((err, res) => { 
        expect(res.statusCode).to.equal(400); 
        done(); 
      }); 
});

  });

  describe('#POST / logout ', () => { 
    
    it('should logout successful', (done) => { 
      request(server).post(`/auth/logout`)
        .end((err, res) => { 
          expect(res.statusCode).to.equal(200); 
          done(); 
        }); 
    });
  });

});
