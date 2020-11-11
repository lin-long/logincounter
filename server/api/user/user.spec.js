'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var User = require('./user.model');

/*describe('GET /users', function() {

  it('Get all users, should respond with JSON array', function(done) {
    request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});*/

describe('POST /TESTAPI/resetFixture', function() {

  it('Delete all users, should respond with {errCode : 1}', function(done) {
    request(app)
      .post('/TESTAPI/resetFixture')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.SUCCESS);
        done();
      });
  });
});

describe('POST /users/add', function() {

  var newUser = {user: 'Lin', password: 'test' };

  it('Add new user, should respond with {errCode : 1, count : 1}', function(done) {
    request(app)
      .post('/users/add')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.SUCCESS);
        res.body.should.have.property('count', 1);
        done();
      });
  });
});

describe('POST /users/add', function() {

  var newUser = {user: 'Lin', password: 'test' };

  it('Add existing user, should respond with {errCode : -2}', function(done) {
    request(app)
      .post('/users/add')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_USER_EXISTS);
        done();
      });
  });
});

describe('POST /users/add', function() {

  var newUser = {user: 'This is a test username that is longer than 128 characters.' 
                        + 'This is a test username that is longer than 128 characters.' 
                        + 'This is a test username that is longer than 128 characters.', password: 'test' };

  it('Add new user with invalid username (> 128 characters), should respond with {errCode : -3}', function(done) {
    request(app)
      .post('/users/add')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_BAD_USERNAME);
        done();
      });
  });
});

describe('POST /users/add', function() {

  var newUser = {user: '', password: 'test' };

  it('Add new user with invalid username (empty), should respond with {errCode : -3}', function(done) {
    request(app)
      .post('/users/add')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_BAD_USERNAME);
        done();
      });
  });
});


describe('POST /users/add', function() {

  var newUser = {user: 'TestUser', password: 'This is a test password that is longer than 128 characters.' 
                        + 'This is a test password that is longer than 128 characters.'
                        + 'This is a test password that is longer than 128 characters.'};

  it('Add new user with invalid password (> 128 characters), should respond with {errCode : -4}', function(done) {
    request(app)
      .post('/users/add')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_BAD_PASSWORD);
        done();
      });
  });
});

describe('POST /users/login', function() {

  var newUser = {user: 'Lin', password: 'test'};

  it('Login with an existing username, should respond with {errCode : 1, count : numLogins}', function(done) {
    request(app)
      .post('/users/login')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.SUCCESS);
        res.body.should.have.property('count', res.body.count)
        done();
      });
  });
});

describe('POST /users/login', function() {

  var login = {user: 'TestUser11', password: 'test'};

  it('Login with invalid username, should respond with {errCode : -1}', function(done) {
    request(app)
      .post('/users/login')
      .send(login)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_BAD_CREDENTIALS);
        done();
      });
  });
});

describe('POST /users/login', function() {

  var login = {user: '', password: 'test'};

  it('Login with empty username, should respond with {errCode : -1}', function(done) {
    request(app)
      .post('/users/login')
      .send(login)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_BAD_CREDENTIALS);
        done();
      });
  });
});

describe('POST /users/login', function() {

  var login = {user: 'Lin', password: ''};

  it('Login with invalid password, should respond with {errCode : -1}', function(done) {
    request(app)
      .post('/users/login')
      .send(login)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('errCode', User.ERR_BAD_CREDENTIALS);
        done();
      });
  });
});


