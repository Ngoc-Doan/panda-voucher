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
//Our parent block
describe('Users', function() {
    it('1: Kiểm tra POST - người dùng đăng nhập và trả về 1 token (jwt)', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
            expect(res).to.have.cookie('token');
            done()
      })
    });
    it('2: Kiểm tra PUT - cập nhật thông tin một user - login lấy token -> post data -> kiểm tra thông tin', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi44444@gmail.com',
            phone:'0972715856',
            url:"https://www.facebook.com/a.tun262/",
            street:'D7/8',
            city:'Bình Dương',
            district: 'Thị xã Thuận An',
            code: 75000,
            desc:'Test unit test với user model',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(200);  // trả về mã code 200
            res.body.should.be.a('object');
            res.body.user.should.be.a('object');

            // res.body.user.should.have.property('email').eql('caoboiloi44444@gmail.com')
            res.body.user.should.have.property('name').eql('Huỳnh Tấn Lợi')
            res.body.user.should.have.property('desc').eql('Test unit test với user model')
            res.body.user.should.have.property('phone').eql('0972715856')
            done();
        });
      })
    });
    // 
    it('3: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> xác thực mật khẩu sai khi cập nhật thông tin user', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'0972715856',
            url:"https://www.facebook.com/a.tun262/",
            street:'D7/8',
            city:'Bình Dương',
            district: 'Thị xã Thuận An',
            code: 75000,
            desc:'Test unit test với user model',
            password:'1231233'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Xác thực mật khẩu sai')
            done();
        });
      })
    });

    it('4: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra tên không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: '',
            email: 'caoboiloi4@gmail.com',
            phone:'',
            url:"",
            street:'',
            city:'',
            district: '',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng nhập tên người dùng')
            done();
        });
      })
    });

    it('5: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra SĐT không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'',
            url:"",
            street:'',
            city:'',
            district: '',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng nhập số điện thoại')
            done();
        });
      })
    });

    it('6: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra URL không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'0972715856',
            url:"",
            street:'',
            city:'',
            district: '',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng nhập thông tin trang mạng xã hội (FB, Instagram,...)')
            done();
        });
      })
    });

    it('7: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra địa chỉ không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'0972715856',
            url:"https://github.com/caoboiloi",
            street:'',
            city:'',
            district: '',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng nhập địa chỉ nhà')
            done();
        });
      })
    });

    it('8: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra thông tin quận không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'0972715856',
            url:"https://github.com/caoboiloi",
            street:'D7/8 Khu phố Bình Thuận 2',
            city:'',
            district: '',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng nhập địa chỉ thông tin quận')
            done();
        });
      })
    });

    it('9: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra thông tin thành phố không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'0972715856',
            url:"https://github.com/caoboiloi",
            street:'D7/8 Khu phố Bình Thuận 2',
            city:'',
            district: 'Quận 7',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng nhập địa chỉ thông tin thành phố')
            // res.body.should.have.property('error').eql('Vui lòng nhập zip code của thành phố')
            done();
        });
      })
    });

    it('10: Kiểm tra PUT - bắt lỗi của user - login lấy token -> post data -> kiểm tra zip code thành phố không được bỏ trống hay undefined', (done) => {
      agent
      .post('/login')
      .send({username:'caoboiloi', password: '123123'})
      .then((res) => {
        expect(res).to.have.cookie('token');
        agent
        .put('/api/users/607d1ae4d942ec381477b5bb')
        .set('Content-Type', 'application/json')
        .send({
            name: 'Huỳnh Tấn Lợi',
            email: 'caoboiloi4@gmail.com',
            phone:'0972715856',
            url:"https://github.com/caoboiloi",
            street:'D7/8 Khu phố Bình Thuận 2',
            city:'HCM',
            district: 'Quận 7',
            code: undefined,
            desc:'',
            password:'123123'
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(false);
            res.body.should.have.property('error').eql('Vui lòng cung cấp zip code của thành phố')
            done();
        });
      })
    });
});