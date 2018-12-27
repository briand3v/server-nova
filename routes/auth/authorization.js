var express = require('express');
var router = express.Router();
var dbase = require('../../dbconnection')
var User = require('../../models/user')
var response = require('../../helpers/response')
var bcrypt = require('bcrypt');

var auth = require('../../services/auth/auth')

router.post('/login', auth.login)

router.post('/signup', auth.registre)

router.get('/user',(req, res, next) => {

	dbase.db.collection('users').findOne({name: 'briansuper'}, (err, user) =>{
		if(err) throw err
		response.data(req, res, user)
	})

})

module.exports = router;