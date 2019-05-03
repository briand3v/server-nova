'use strict'

const response = require('../../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const config = require('../../config')
const moment = require('moment')

const novadb = require('../db')
const UserSchema = require('../../models/userModel');


const registre = (req,res,next) => {
	const {
		username,
		password,
		email
	} = req.body

	if(!username){
		return response.unprocessable(req, res , 'Missing mandatory field "Username"')
	}
	if(!password){
		return response.unprocessable(req, res , 'Missing mandatory field "Password"')
	}

	novadb.getdb().collection('users', UserSchema).findOne({name: username}, (err, userExist) => {
		if(err) throw err
		
		if(userExist){
			return response.unprocessable(req, res , 'Missing mandatory field "Username"')
		}

		const salt = bcrypt.genSaltSync(10)
		const hashPass = bcrypt.hashSync(password, salt)

		novadb.getdb().collection('users', UserSchema).insertOne({name: username, email: email, password: hashPass}, (err, user) => {
			if(err) {
				return next(err)
			}
			
			var superdata = {
				data: {
					result: user.result,
					username: user.ops.name
				},
				jwt: createToken(user)
			}
			response.data(req, res, superdata)

		})
	})
}


const login = (req, res, next) => {

	novadb.getdb().collection('users', UserSchema).findOne({name: req.body.username}, (err, user)=>{
		if(!user) return response.notFound(req, res, req.body.username+' not found!')
		if(!req.body.password) return response.unprocessable(req, res, 'Password required!!')
		if(!bcrypt.compareSync(req.body.password, user.password)) return response.unprocessable(req, res, 'Wrong password')
		// set cookie with the user's info
		req.session.user = user
		console.log(user)
		const superdata = {
				data: {
					id: user._id,
					username: user.name,
					email: user.email						
				}
			}
		response.data(req, res, superdata)
	})
}


const ensureAuthenticated = (req, res, next) => {

	if(!req.headers.authorization){
		return response.unauthorized(req, res, 'TokenMissing')
	}

	const token = req.headers.unauthorized.split('')[1]

	const payload = jwt.decode(token, config.TOKEN_SECRET)

	if(payload.exp <= moment().unix()){
		return response.unauthorized(req, res, 'TokenExpired')
	}
	// check if the user exits
	novadb.getdb().collection('users',UserSchema).findOne({_id: payload.sub},(err, person) => {
		if(!person) return response.notFound(req, res , 'Person not found!')

		req.user = payload.sub
		next()
	})
}


const createToken = (user) => {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14,'days').unix()
	}
	return jwt.encode(payload, config.TOKEN_SECRET)
}

const logout = (req, res, next) => {
	// destroy session
}


module.exports = {
	registre,
	login,
	ensureAuthenticated,
	createToken
}
