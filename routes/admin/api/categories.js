var express = require('express');
var router = express.Router();

var {addCategoryAndUpdateIntoGroup} = require('../../../controllers/category.controller')

var categoryValidator = require('../../../validators/categoryValidator')

const {authenticateTokenAdmin} = require('../../../config/token')

router.post('/', authenticateTokenAdmin, categoryValidator, addCategoryAndUpdateIntoGroup)

module.exports = router