'use strict';

var _ = require('lodash');
var User = require('./user.model');
var exec = require('child_process').exec

var NUM_UNIT_TESTS = 10;

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });
};

//Add user to database
//Check that the user does not exist in the database and that the user name is not empty
exports.add = function(req, res) {

  var query = {'user': req.body.user};
  var update = {$inc : {'count': 1}}
  
  User.find(query, function (err, queryRes) {
    if(err) { return handleError(res, err); }
    if (queryRes.length != 0) { 
      return res.send(200, {errCode : User.ERR_USER_EXISTS});
    } 

    //check user name is not empty and is less than max length
    if (req.body.user.length == null || req.body.user.length == '' ||
        req.body.user.length > User.MAX_USERNAME_LENGTH) {
      return res.send(200, {errCode : User.ERR_BAD_USERNAME});
    } 
    if (req.body.password.length > User.MAX_PASSWORD_LENGTH) { //password can be emtpy
      return res.send(200, {errCode : User.ERR_BAD_PASSWORD});
    }

    var newUser = {'user': req.body.user,'password': req.body.password, 'count': 1};
    User.create(newUser, function(err, user) {
      if(err) { return handleError(res, err); }
      return res.send(200, {errCode : User.SUCCESS, count : 1});
    }); 
  });
};

// Checks the user/password in the database (case sensitive) and increments login count by 1
exports.login = function(req, res) {

  console.log("HERE IS THE REQUEST: ", req.body);

  var query = {'user': req.body.user,'password': req.body.password};
  var update = {$inc : {'count': 1}} 
  
  User.findOneAndUpdate(query, update, {}, function (err, updatedUser) {
    if(err) { return handleError(res, err); }
    if (updatedUser == null) {
      return res.json(200, {errCode : User.ERR_BAD_CREDENTIALS});
    } 
    return res.json(200, {errCode : User.SUCCESS, count : updatedUser.count}); 
  });
};

// Deletes all users from the DB
exports.TESTAPI_resetFixture = function(req, res) {
  //res = User.TESTAPI_resetFixture();
   User.remove({}, function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, {errCode : User.SUCCESS});
  });
};

//runs all unit tests, outputs the number of tests, successes, failures, and 
//the complete output of the tests as the response (as a JSON dictionar)
exports.TESTAPI_unitTests = function(req, res) {
  console.log('starting to run tests here!!!!1')
  exec('npm test', function(error, stdout, stderr) {
    //if(error) { return handleError(res, error); }
    console.log(stdout);

    //parse the unit test output
    var outputString = stdout.toString();
    var outputLines = outputString.split(/(\r?\n)/g);
    for (var i = 0; i < outputLines.length; i++) { //parse each line
      var index = outputLines[i].indexOf("passing");
      if (index > -1) {
        var sub = outputLines[i].substring(index - 3, index - 1);
        var numFailed = NUM_UNIT_TESTS - parseInt(sub.trim());
      }
    }

    return res.json(200, {nrFailed : numFailed, output : stdout, totalTests : NUM_UNIT_TESTS});
  });
};


function handleError(res, err) {
  return res.send(500, err);
}

