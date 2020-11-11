'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

router.post('/login', controller.login);
router.post('/add', controller.add);
router.post('/resetFixture', controller.TESTAPI_resetFixture); 
router.post('/unitTests', controller.TESTAPI_unitTests); 

module.exports = router;