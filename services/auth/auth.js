'use strict'

var Nova = require('../nova')
var client = require('../../dbconnection');
var response = require('../../helpers/response')
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../../config')
var moment = require('moment')

class Auth extends Nova{
	constructor(c){
		super()
		this.user = c
		this.registre = this.registre.bind(this)
		this.login = this.login.bind(this)
		this.ensureAuthenticated = this.ensureAuthenticated.bind(this)
		this.createToken = this.createToken.bind(this)
	}

	registre(req, res, next){
		// User data to create 
		const { 
			username,
			password,
			email,
		} = req.body;
		
		if(!username){
			return response.unprocessable(req, res , 'Missing mandatory field "Username"')
		}
		if(!password){
			return response.unprocessable(req, res , 'Missing mandatory field "Password"')
		}

		this.user.db.collection('users').findOne({name: username}, (err, userExist) => {
			if(err) throw err

			if(userExist){
				return response.unprocessable(req, res, 'Username already in use')
			}
			const salt = bcrypt.genSaltSync(10)
			const hashPass = bcrypt.hashSync(password, salt)


			this.user.db.collection('users').insertOne({name: username, email: email, password: hashPass}, (err, user) => {
				if(err) {
					return next(err)
				}
				
				var superdata = {
					data: {
						result: user.result,
						username: user.ops.name
					},
					jwt: this.createToken(user)
				}
				response.data(req, res, superdata)

			})
		})
	}


	login(req, res, next){

		this.user.db.collection('users').findOne({name: req.body.username}, (err, user)=>{
			if(!user) return response.notFound(req, res, req.body.username+' not found!')
			if(!req.body.password) return response.unprocessable(req, res, 'Password required!!')
			if(!bcrypt.compareSync(req.body.password, user.password)) return response.unprocessable(req, res, 'Wrong password')
			// set cookie with the user's info
			req.session.user = user
			console.log(user)
			var superdata = {
					data: {
						id: user._id,
						username: user.name,
						email: user.email						
					}
				}
			response.data(req, res, superdata)
		})
	}

	logout(req, res, next){
		// destroy the session

	}

	ensureAuthenticated(req, res, next){
		if(!req.headers.authorization){
			return response.unauthorized(req, res, 'TokenMissing')
		}

		var token = req.headers.unauthorized.split('')[1]

		var payload = jwt.decode(token, config.TOKEN_SECRET)

		if(payload.exp <= moment().unix()){
			return response.unauthorized(req, res, 'TokenExpired')
		}
		// check if the user exits
		this.user.db.collection('users').findOne({_id: payload.sub},(err, person) => {
			if(!person) return response.notFound(req, res , 'Person not found!')

			req.user = payload.sub
			next()
		})
	}

	createToken(user){
		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14,'days').unix()
		}
		return jwt.encode(payload, config.TOKEN_SECRET)
	}

}

var auth = new Auth(client)

module.exports = auth;