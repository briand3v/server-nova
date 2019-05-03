'use strict'

const response = require('../helpers/response')
const novadb = require('./db')
const ImageModel = require('../models/imageModel')
const CardSchema = require('../models/cardModel');


const createcard = (req, res, next) => {
	const {
		type,
		title,
		desc,
		date,
		message,
	} = req.body

	const userid = req.params.id
	
	novadb.getdb().collection('cards', CardSchema).insertOne({_userid: userid,type: type, title: title, desc: 'desc', date: date }, (err, card) => {
		if(err) throw err

		if(card){
			response.data(req, res, card)
		}
	})
}

const uploadImages = (req, res, next) => {

	if(Array.isArray(req.file)){
		// upload bulk images
		return
	}
	
	const userId = req.body.userId
	const index = Number(req.body.index) // force to number

	if(req.file){
		novadb.getdb().collection('images', ImageModel).insertOne({_userId: userId, path: '/images/'+req.file.filename, index: index}, (err, img) => {
			if(err) throw err
			
			if(img) response.data(req, res, {message: 'The image '+img.ops.path+'was upload successfully!', filename: `/images/${req.file.filename}`})
		})
	}
}

const loadAllImages = (req, res, next) => {

	novadb.getdb().collection('images', ImageModel).find({},(err,images)=>{
		if(err) throw err

		if(images){
			response.data(req, res, {links: images})
		}
	})
} 


module.exports = {
	createcard,
	uploadImages,
	loadAllImages
}