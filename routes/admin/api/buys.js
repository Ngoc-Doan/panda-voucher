var express = require('express');
var router = express.Router();

const {updateValidationBuyById, updateCancelBuyById, gerBuyById} = require('../../../controllers/buy.controller')

const {authenticateTokenAdmin} = require('../../../config/token')

router.put('/validation', authenticateTokenAdmin, updateValidationBuyById)

router.put('/cancel', authenticateTokenAdmin, updateCancelBuyById)

router.get('/:id', authenticateTokenAdmin, gerBuyById)

module.exports = router;