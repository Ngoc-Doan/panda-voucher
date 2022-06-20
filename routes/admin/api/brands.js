var express = require('express');
var router = express.Router();

var {addBrandAndUpdateIntoCity} = require('../../../controllers/brand.controller')

var brandValidator = require('../../../validators/brandValidator')

const {authenticateTokenAdmin} = require('../../../config/token')

router.post('/', authenticateTokenAdmin, brandValidator, addBrandAndUpdateIntoCity)

module.exports = router