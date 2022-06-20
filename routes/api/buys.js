var express = require('express');
var router = express.Router();

var {addBuyAndDeleteCart, getAllBuy, addBuy, updateCancelBuyById, updateReceiveBuyById} = require('../../controllers/buy.controller')

const {purchaseImprove} = require('../../pattern/PurchaseImproveAdapter')

const buyValidator = require('../../validators/buyValidator')

const {authenticateToken} = require('../../config/token')

router.get('/', authenticateToken, getAllBuy)
router.post('/', authenticateToken, buyValidator, addBuyAndDeleteCart)
router.post('/add', authenticateToken, buyValidator, addBuy)

// Adapter Pattern
router.post('/adapter', buyValidator, purchaseImprove)

router.put('/cancel', authenticateToken, updateCancelBuyById)

router.put('/receive', authenticateToken, updateReceiveBuyById)

module.exports = router;