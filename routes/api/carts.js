var express = require('express');
var router = express.Router();

const {getAllCart, addCart, deleteOneCart, updateQuantityItem, getCartById, deleteAllCartOfUser} = require('../../controllers/cart.controller')

const cartValidator = require('../../validators/cartValidator')
const cartDeleteOneCartValidator = require('../../validators/cartDeleteOneCartValidator')
const cartUpdateQuantityItemValidator = require('../../validators/cartUpdateQuantityItemValidator')

const {authenticateToken} = require('../../config/token')

router.get('/', authenticateToken, getAllCart)

router.get('/:id',authenticateToken, getCartById)


router.post('/', authenticateToken, cartValidator, addCart)

router.delete('/', authenticateToken, cartDeleteOneCartValidator, deleteOneCart)

router.put('/quantity', authenticateToken, cartUpdateQuantityItemValidator, updateQuantityItem)

router.delete('/all', authenticateToken, deleteAllCartOfUser)

module.exports = router;