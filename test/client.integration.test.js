describe('Client API Integration Tests', function() {
  describe('#GET / Client by Id', function() { 
    it('should get the client by Id', function(done) { 
      request(app) .get('/tasks')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('array'); 
          expect(res.body).to.be.empty; 
          done(); 
        }); 
    });
  });
});
