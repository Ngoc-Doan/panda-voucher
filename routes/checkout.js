var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../config/token')

const Cart = require('../models/cart')

router.get('/',authenticateToken, async(req, res, next) => {
    const {shippers} = req.vars
    var {brands, categories} = req.vars
    var {footer} = req.footer
    var {cart, city_id, district, address, city}= req.query
    if (!req.user) {
        return res.redirect('login/logout')
    }
    try {
        var data = await Cart.findById(cart).populate('products.voucher').exec()
        // cartCheckout = data.products
        // totalPrice = data.totalPrice
        shippers[0].city.forEach(c => {
            if (c.item._id == city_id) {
                if (city == undefined || city == "") {
                    city = c.item.name
                }
                res.render('checkout', {
                    user: req.user,
                    shippers: shippers,
                    address: address,
                    district: district,
                    city: city,
                    city_id: city_id,
                    carts: data,
                    categories,
                    footer,
                    brands
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
});

module.exports = router;