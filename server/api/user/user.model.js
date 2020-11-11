'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

  user: String,
  password: String,
  count: Number 

});

//see public methods add, login, TESTAPI_resetFixture, and unitTests in server/user.controller.js

UserSchema.statics.SUCCESS = 1;
UserSchema.statics.ERR_BAD_CREDENTIALS = -1;
UserSchema.statics.ERR_USER_EXISTS = -2;
UserSchema.statics.ERR_BAD_USERNAME = -3;
UserSchema.statics.ERR_BAD_PASSWORD = -4;
UserSchema.statics.MAX_USERNAME_LENGTH = 128
UserSchema.statics.MAX_PASSWORD_LENGTH = 128;

var User = mongoose.model('User', UserSchema);


module.exports = User;
//module.exports = mongoose.model('User', UserSchema);
