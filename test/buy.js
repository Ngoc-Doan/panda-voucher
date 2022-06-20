//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
var agent = chai.request.agent(server)

describe('Buys', function() {
    it('1: Kiểm tra GET - lấy toàn bộ đơn hàng đã thanh toán', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .get('/api/buys')
            .end((err, res) => {
                res.should.have.status(200);  // trả về mã code 200
                res.body.status.should.be.eql(true)
                res.body.should.be.a('object');
                res.body.Buy.should.be.a('array');
                done();
            });
        })
    });

    it('2: Kiểm tra POST - user id rỗng hay undefined khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '0972715856',
                email: 'loihuynh.it@gmai.com',
                cart: '',
                shipper:'',
                address:'',
                district:'',
                city:'',
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Vui lòng đăng nhập');
                done();
            });
        })
    });

    it('3: Kiểm tra POST - cart id rỗng hay undefined khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '0972715856',
                email: 'loihuynh.it@gmai.com',
                cart: '',
                shipper:'',
                address:'',
                district:'',
                city:'',
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Lỗi xảy ra, vui lòng refresh lại trang');
                done();
            });
        })
    });

    it('4: Kiểm tra POST - name rỗng hay undefined khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: '',
                phone: '0972715856',
                email: 'loihuynh.it@gmai.com',
                cart: '607fa433d65a111ba493917b',
                shipper : '',
                address:'D7/4 Thị xã long điền',
                district:'Quận mẫu hệ',
                city:{item: '608be99d5a0c80ffe8df3b06', name: 'Phú Hoà'},
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Vui lòng cung cấp tên người dùng');
                done();
            });
        })
    });

    it('5: Kiểm tra POST - phone rỗng hay undefined khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '',
                email: 'loihuynh.it@gmai.com',
                cart: '607fa433d65a111ba493917b',
                shipper : '',
                address:'D7/4 Thị xã long điền',
                district:'Quận mẫu hệ',
                city:{item: '608be99d5a0c80ffe8df3b06', name: 'Phú Hoà'},
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Vui lòng cung cấp số điện thoại');
                done();
            });
        })
    });
    it('6: Kiểm tra POST - phone quá 10 số - lỗi khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '09727158563',
                email: 'loihuynh.it@gmai.com',
                cart: '607fa433d65a111ba493917b',
                shipper : '',
                address:'D7/4 Thị xã long điền',
                district:'Quận mẫu hệ',
                city:{item: '608be99d5a0c80ffe8df3b06', name: 'Phú Hoà'},
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Số điện thoại không ngắn quá 10 số');
                done();
            });
        })
    });

    it('7: Kiểm tra POST - email sai định dạng khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '0972715856',
                email: 'loihuynh.itgmai.com',
                cart: '607fa433d65a111ba493917b',
                shipper : '',
                address:'D7/4 Thị xã long điền',
                district:'Quận mẫu hệ',
                city:{item: '608be99d5a0c80ffe8df3b06', name: 'Phú Hoà'},
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Địa chỉ email không hợp lệ vui lòng nhập lại');
                done();
            });
        })
    });

    it('8: Kiểm tra POST - email rỗng hay undefined khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '0972715856',
                email: '',
                cart: '607fa433d65a111ba493917b',
                shipper : '',
                address:'D7/4 Thị xã long điền',
                district:'Quận mẫu hệ',
                city:{item: '608be99d5a0c80ffe8df3b06', name: 'Phú Hoà'},
                note:'',
                password: '123123'
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Vui lòng cung cấp địa chỉ email');
                done();
            });
        })
    });

    it('9: Kiểm tra POST - password xác thực rỗng hay undefined ro khi thanh toán đơn hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .post('/api/buys')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1ae4d942ec381477b5bb',
                validation: false,
                check: false,
                name: 'Huỳnh Lợi',
                phone: '0972715856',
                email: 'loihuynh.it@gmail.com',
                cart: '607fa433d65a111ba493917b',
                shipper : {item: '608be99d5a0c80ffe8df3b06', price: 30000},
                address:'D7/4 Thị xã long điền',
                district:'Quận mẫu hệ',
                city:{item: '608be99d5a0c80ffe8df3b06', name: 'Phú Hoà'},
                note:'dddd',
                password: ''
            })
            .end((err, res) => {
                res.should.have.status(500);  // trả về mã code 200
                res.body.status.should.be.eql(false)
                res.body.should.be.a('object');
                res.body.error.should.be.eql('Vui lòng cung cấp xác thực mật khẩu');
                done();
            });
        })
    });
});