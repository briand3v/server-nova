'use strict'

var express = require('express');
var router = express.Router();
var envDotProp = require('env-dot-prop');
var db = require('../dbconnection')

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

module.exports = router;
