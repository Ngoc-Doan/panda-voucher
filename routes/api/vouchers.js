var express = require('express');
var router = express.Router();

const {authenticateToken} = require('../../config/token')

const {getAllVoucher, getLimitVoucher} = require('../../controllers/voucher.controller')

router.get('/', getAllVoucher)

router.get('/:page', getLimitVoucher)

module.exports = router;