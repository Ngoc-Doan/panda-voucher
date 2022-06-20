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

describe('Carts', function() {
    it('1: Kiểm tra GET - lấy tất cả danh sách giỏ hàng', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .get('/api/carts')
            .end((err, res) => {
                res.should.have.status(200);  // trả về mã code 200
                res.body.status.should.be.eql(true)
                res.body.should.be.a('object');
                res.body.Carts.should.be.a('array');

                res.body.Carts.length.should.be.eql(11)
                done();
            });
        })
    });

    it('2: Kiểm tra GET - lấy 1 giỏ hàng theo id', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .get('/api/carts/607ff3873001e90a684cd017')
            .end((err, res) => {
                res.should.have.status(200);  // trả về mã code 200
                res.body.status.should.be.eql(true)
                res.body.should.be.a('object');
                res.body.Carts.should.be.a('object');

                res.body.Carts.totalPrice.should.be.eql(0)
                res.body.Carts.user.should.be.eql('607ff29201303d22e0c0ded7')
                res.body.Carts.should.have.property('products')
                res.body.Carts.products.should.be.a('array')
                done();
            });
        })
    });

    it('3: Kiểm tra DELETE - xoá 1 sản phẩm trong giỏ hàng của 1 user nào đó', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .delete('/api/carts')
            .set('Content-Type', 'application/json')
            .send({
                user: '607ff29201303d22e0c0ded7',
                product: '607ff3873001e90a684cd018',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true)
                res.body.message.should.be.eql('Xoá sản phẩm thành công')
                res.body.Cart.user.should.be.eql('607ff29201303d22e0c0ded7')
                res.body.Cart.products.should.be.a('array')
                done();
            });
        })
    });

    it('4: Kiểm tra DELETE - user nếu rỗng hay undefined khi xoá sản phẩm 1 giỏ hàng của user thì báo lỗi', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .delete('/api/carts')
            .set('Content-Type', 'application/json')
            .send({
                user: '',
                product: '607ff3873001e90a684cd018',
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.status.should.be.eql(false)
                res.body.error.should.be.eql('Vui lòng đăng nhập')
                done();
            });
        })
    });
    it('5: Kiểm tra DELETE - products nếu rỗng hay undefined khi xoá sản phẩm 1 giỏ hàng của user thì báo lỗi', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .delete('/api/carts')
            .set('Content-Type', 'application/json')
            .send({
                user: '607ff29201303d22e0c0ded7',
                product: '',
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.status.should.be.eql(false)
                res.body.error.should.be.eql('Lỗi xảy ra, vui lòng refresh lại trang')
                done();
            });
        })
    });

    it('6: Kiểm tra PUT - update số lượng của một sản phẩm trong giỏ hàng của 1 user', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .put('/api/carts/quantity')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1f587640c02fec7f037a',
                product: '60952ceeaf6ab027f871a99b',
                amount: parseInt(1)
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true)
                res.should.be.a('object')
                res.body.message.should.be.eql('Cập nhật sản phẩm thành công')
                res.body.Cart.should.be.a('object')
                res.body.Cart.products.should.be.a('array')
                done();
            });
        })
    });
    it('7: Kiểm tra PUT - user id nếu rỗng hay undefined khi update quantity 1 cart trong user ', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .put('/api/carts/quantity')
            .set('Content-Type', 'application/json')
            .send({
                user: '',
                product: '60952ceeaf6ab027f871a99b',
                amount: parseInt(1)
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.status.should.be.eql(false)
                res.body.error.should.be.eql('Vui lòng đăng nhập')
                done();
            });
        })
    });

    it('8: Kiểm tra PUT - product id nếu rỗng hay undefined khi update quantity 1 cart trong user', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .put('/api/carts/quantity')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1f587640c02fec7f037a',
                product: '',
                amount: parseInt(1)
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.status.should.be.eql(false)
                res.body.error.should.be.eql('Lỗi xảy ra, vui lòng refresh lại trang')
                done();
            });
        })
    });

    it('9: Kiểm tra PUT - quantity nếu = 0 khi update quantity 1 cart trong user', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .put('/api/carts/quantity')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1f587640c02fec7f037a',
                product: '60952ceeaf6ab027f871a99b',
                amount: 0
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.status.should.be.eql(false)
                res.body.error.should.be.eql('Số lượng sản phẩm bằng 0, vui lòng nhập lại')
                done();
            });
        })
    });

    it('10: Kiểm tra PUT - quantity nếu rỗng hay undefined khi update quantity 1 cart trong user', (done) => {
        agent
        .post('/login')
        .send({username:'caoboiloi', password: '123123'})
        .then((res) => {
            expect(res).to.have.cookie('token');
            agent
            .put('/api/carts/quantity')
            .set('Content-Type', 'application/json')
            .send({
                user: '607d1f587640c02fec7f037a',
                product: '60952ceeaf6ab027f871a99b',
                amount: undefined
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.status.should.be.eql(false)
                res.body.error.should.be.eql('Lỗi xảy ra, vui lòng refresh lại trang')
                done();
            });
        })
    });
});