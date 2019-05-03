'use strict'

var Singletondb = require('../dbconnection');
var multer = require('multer')
var path = require('path')


const config = {
	actions: 'basic actions',
	user: 'brianmc',
	mode: 'basic app',
	aname: ['nova', 'jarvis', 'friday']
}


const uploadImages = () => {
	const options = {
		storage : multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, "./public/images/")
			},
			filename: (req, file, cb) => {
				cb(null, `${Date.now()}${path.extname(file.originalname)}`);
			}
		})
	}
	return multer(options)
}


module.exports = {
	uploadImages,
	config
}
