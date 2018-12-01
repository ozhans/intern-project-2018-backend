var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App',function() {
    describe('get request', function() {
        it('responds with status 200',function(done){
            chai.request(app)
                .get('/api/data')
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

    describe('post request',function(){
        it('responds with status 403',function(done){
            chai.request(app)
                .post('/api/data')
                .end(function(err,res){
                    expect(res).to.have.status(403);
                    done();
                })
        })
    })

    describe('put request',function(){
        it('responds with status 403',function(done){
            chai.request(app)
                .put('/api/data/id')
                .end(function(err,res){
                    expect(res).to.have.status(403);
                    done();
                })
        })
    })

    describe('delete request',function(){
        it('responds with status 403',function(done){
            chai.request(app)
                .delete('/api/data/id')
                .end(function(err,res){
                    expect(res).to.have.status(403);
                    done();
                })
        })
    })

    describe('login request',function(){
        let info = {email :'admin',password:'admin'}
        it('responds with status 409',function(done){
            chai.request(app)
                .post('/api/auth/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

    describe('register request',function(){
        let info = {email :'admin',password:'admin',name:'admin'}
        it('responds with status 409',function(done){
            chai.request(app)
                .post('/api/auth/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end(function(err,res){
                    expect(res).to.have.status(409);
                    done();
                })
        })
    })

})