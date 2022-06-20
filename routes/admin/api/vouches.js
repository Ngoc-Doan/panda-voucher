var express = require('express');
var router = express.Router();

const {addVoucher, updateVoucherById, deleteVoucherById} = require('../../../controllers/voucher.controller')

const voucherValidator = require('../../../validators/voucherValidator')
const updateVoucherValidator = require('../../../validators/updateVoucherValidator')

const {authenticateTokenAdmin} = require('../../../config/token')

router.post('/', authenticateTokenAdmin, voucherValidator, addVoucher)

router.put('/:id', authenticateTokenAdmin, updateVoucherValidator, updateVoucherById)

router.delete('/:id', authenticateTokenAdmin, deleteVoucherById)

module.exports = router;