//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Vouchers', function() {
    it('1: Kiểm tra GET - lấy toàn bộ voucher', (done) => {
        chai.request(server)
        .get('/api/vouchers')
        .end(function(err, res){
          res.should.have.status(200);  // trả về mã code 200
          res.should.be.json;
          res.body.voucher.should.be.a('array');
          res.body.voucher.length.should.be.eql(43);
          done();
        });
    });
    it('2: Kiểm tra GET - lấy giới hạn voucher theo số page', (done) => {
      chai.request(server)
      .get('/api/vouchers/1')
      .end(function(err, res){
        res.should.have.status(200);  // trả về mã code 200
        res.should.be.json;
        res.body.vouchers.should.be.a('array');
        res.body.vouchers.length.should.be.eql(9);
        done();
      });
    });
});