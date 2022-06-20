//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Reviews', function() {
    it('1: Kiểm tra GET - lấy ra số lượng review giới hạn 5 của 1 voucher', (done) => {
        chai.request(server)
        .get('/api/reviews/1/607cd8cae6b16dc574d72d9f')
        .end(function(err, res){
          res.should.have.status(200);  // trả về mã code 200
          res.should.be.json;
          res.body.review.should.be.a('array');
          res.body.review.length.should.be.eql(5);
          done();
        });
    });

    it('2: Kiểm tra POST - thêm review mới cho một voucher nào đó', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '607cd8cae6b16dc574d72d9f',
            email: 'loihuynh.it@gmail.com',
            name: 'Huỳnh Lợi',
            star: 4,
            review: 'test thử chức năng thêm review mới cho một bài viết cụ thể',
            date: new Date()
        })
        .end(function(err, res){
          res.should.have.status(200);  // trả về mã code 200
          res.should.be.json;
          res.body.review.should.be.a('object')
          res.body.review.star.should.be.eql(4)
          res.body.review.review.should.be.eql('test thử chức năng thêm review mới cho một bài viết cụ thể')
          res.body.review.name.should.be.eql('Huỳnh Lợi')
          res.body.review.email.should.be.eql('loihuynh.it@gmail.com')
          done();
        });
    });

    it('3: Kiểm tra POST - tính hợp lệ của email truyền vào', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '607cd8cae6b16dc574d72d9f',
            email: 'loihuynh.itgmail.com',
            name: 'Huỳnh Lợi',
            star: 4,
            review: 'test thử chức năng thêm review mới cho một bài viết cụ thể',
            date: new Date()
        })
        .end(function(err, res){
            res.should.have.status(500);  // trả về mã code 200
            res.should.be.json;
            res.body.status.should.be.eql(false)
            res.body.error.should.be.eql('Địa chỉ email không hợp lệ vui lòng nhập lại')
            done();
        });
    });

    it('4: Kiểm tra POST - email truyền vào bị bỏ trống hay undefined', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '607cd8cae6b16dc574d72d9f',
            email: '',
            name: 'Huỳnh Lợi',
            star: 4,
            review: 'test thử chức năng thêm review mới cho một bài viết cụ thể',
            date: new Date()
        })
        .end(function(err, res){
            res.should.have.status(500);  // trả về mã code 200
            res.should.be.json;
            res.body.status.should.be.eql(false)
            res.body.error.should.be.eql('Vui lòng cung cấp địa chỉ email')
            done();
        });
    });

    it('5: Kiểm tra POST - name truyền vào bị bỏ trống hay undefined', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '607cd8cae6b16dc574d72d9f',
            email: 'loihuynh.it@gmail.com',
            name: "",
            star: 4,
            review: 'test thử chức năng thêm review mới cho một bài viết cụ thể',
            date: new Date()
        })
        .end(function(err, res){
            res.should.have.status(500);  // trả về mã code 200
            res.should.be.json;
            res.body.status.should.be.eql(false)
            res.body.error.should.be.eql('Vui lòng nhập cung cấp người dùng')
            done();
        });
    });

    it('6: Kiểm tra POST - review truyền vào bị bỏ trống hay undefined', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '607cd8cae6b16dc574d72d9f',
            email: 'loihuynh.it@gmail.com',
            name: "Huỳnh Lợi",
            star: 4,
            review: '',
            date: new Date()
        })
        .end(function(err, res){
            res.should.have.status(500);  // trả về mã code 200
            res.should.be.json;
            res.body.status.should.be.eql(false)
            res.body.error.should.be.eql('Vui lòng đánh giá sản phẩm')
            done();
        });
    });

    it('7: Kiểm tra POST - id voucher của review cần đăng có bị lỗi hay undefined', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '',
            email: 'loihuynh.it@gmail.com',
            name: "Huỳnh Lợi",
            star: 4,
            review: 'test thử chức năng thêm review mới cho một bài viết cụ thể',
            date: new Date()
        })
        .end(function(err, res){
            res.should.have.status(500);  // trả về mã code 200
            res.should.be.json;
            res.body.status.should.be.eql(false)
            res.body.error.should.be.eql('Lỗi xảy ra, vui lòng refresh lại trang')
            done();
        });
    });

    it('8: Kiểm tra POST - số sao đánh giá có bị rỗng hay undefined', (done) => {
        chai.request(server)
        .post('/api/reviews')
        .set('Content-Type', 'application/json')
        .send({
            voucher: '',
            email: 'loihuynh.it@gmail.com',
            name: "Huỳnh Lợi",
            star: undefined,
            review: 'test thử chức năng thêm review mới cho một bài viết cụ thể',
            date: new Date()
        })
        .end(function(err, res){
            res.should.have.status(500);  // trả về mã code 200
            res.should.be.json;
            res.body.status.should.be.eql(false)
            res.body.error.should.be.eql('Lỗi xảy ra, vui lòng refresh lại trang')
            done();
        });
    });
});