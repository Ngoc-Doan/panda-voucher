var express = require('express');
var router = express.Router();

const {updateValidateReviewById, deleteReviewById} = require('../../../controllers/review.controller')

const {authenticateTokenAdmin} = require('../../../config/token')

router.put('/validation', authenticateTokenAdmin, updateValidateReviewById)

router.delete('/:id', authenticateTokenAdmin, deleteReviewById)

module.exports = router;