var express = require('express');
var router = express.Router();
var supercards = require('../services/supercards')
var nova = require('../services/nova')

// list cards
// router.get('/cards', supercards.listcards)

router.post('/:id/new', supercards.createcard)

// router.post('/:id/update', supercards.updatecard)

// router.delete('/:id/delete', supercards.detelecard)

router.post('/upload', nova.uploadImages().single('image'), supercards.uploadImages)

router.get('/images/loadall', supercards.loadAllImages)

module.exports = router;