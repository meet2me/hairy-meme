var assert = require("assert");
var app= require("../app");
var request = require("request");
  // Test for array.
  describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
      });
    });
  });

  // Check Routes and Redirection.
  describe('GET /', function(){
    it('should return 200', function(){
      request.get('http://192.168.1.10:3000', function(err, res){
        assert.equal(res.statusCode, 200);
      });
    });
  });

  describe('GET /dashboard', function(){
    it('should return 200', function(){
      request.get('http://192.168.1.10:3000/dashboard', function(err, res){
        assert.equal(res.statusCode, 200);
      });
    });
  });

  describe('GET /history', function(){
    it('should return 200', function(){
      request.get('http://192.168.1.10:3000/history', function(err, res){
        assert.equal(res.statusCode, 200);
      });
    });
  });

  describe('GET /contact', function(){
    it('should return 200', function(){
      request.get('http://192.168.1.10:3000/contact', function(err, res){
        assert.equal(res.statusCode, 200);
        assert.equal(res.charset, 'utf-8');
      });
    });
  });

  // describe('GET /account', function(){
  //   it('should return 200', function(){
  //     request.get('http://192.168.1.10:3000/account', function(err, res){
  //     assert.equal(res.statusCode, 200);
  //     });
  //   });
  // });