var express = require('express');
var router = express.Router();

const {addReview, getLimitReview} = require('../../controllers/review.controller')

const reviewValidator = require('../../validators/reviewValidator')

router.get('/:page/:voucher', getLimitReview)

router.post('/', reviewValidator, addReview)

module.exports = router