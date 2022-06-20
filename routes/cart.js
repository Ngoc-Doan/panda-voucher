var express = require('express');
var router = express.Router();

const {authenticateToken} = require('../config/token')
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', authenticateToken,async (req, res, next) => {
    let cookie = req.cookies
    let carts = []
    let totalPrice = 0
    let idCart = ""
    var {brands, categories} = req.vars
    var {footer} = req.footer

    const cities = req.vars.brands

    await fetch(`${process.env.URL}/api/carts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `connect.sid=${cookie['connect.sid']};token=${cookie.token}`
        }
    })
    .then(res => res.text())
    .then(data => {
        data = JSON.parse(data)
        if (data.status) {
            if (!req.user) {
                return res.redirect("login/logout")
            }
            data.Carts.forEach(cart => {
                if (cart.user == req.user._id) {
                    carts = cart.products
                    totalPrice = cart.totalPrice
                    idCart = cart._id
                }
            });
            // console.log(idCart)
            res.render('cart', {
                user: req.user ,
                carts: carts,
                totalPrice: totalPrice,
                cities: cities,
                idCart: idCart,
                footer,
                categories,
                brands
            });
        }
    }).catch(e => {
        console.log(e)
        return res.status(500).json({
            status: false,
            error: e.message
        })
    })
});

module.exports = router;