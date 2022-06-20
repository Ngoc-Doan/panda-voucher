//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Shippers', function() {
    it('1: Kiểm tra GET - lấy data shipper theo id', (done) => {
        chai.request(server)
        .get('/api/shippers/608d11f9f0a9a31d20937183')
        .end(function(err, res){
            res.should.have.status(200);  // trả về mã code 200
            res.body.should.have.property('status').eql(true)
            res.should.be.json;
            res.body.Shipper.should.be.a('object');
            res.body.Shipper.city.should.be.a('array')
            res.body.Shipper.city.length.should.be.eql(16)
            done()
        });
    });
});