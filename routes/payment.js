var express = require('express');
var router = express.Router();

const Buy = require('./../models/buy')

const moment = require('moment')

const {authenticateToken} = require('../config/token')

router.get('/', authenticateToken, async (req, res, next) => {
    try {
        if (!req.user) {
            return res.redirect("login/logout")
        }
        var {recommend} = req.recommend
        var {brands, categories} = req.vars
        var {footer} = req.footer
        var allBuy = await Buy.find({user: req.user._id}).populate({
            path: 'shipper',
            populate: {
                path: 'item',
                select: 'name'
            }
        }).sort({date: 'desc'})
        if (allBuy.length !== 0) {
            res.render('payment', {buys: allBuy,user: req.user, recommend,footer,categories,brands,moment})
        }
        else {
            res.render('payment', {buys: [], user: req.user, recommend,footer,categories,brands,moment})
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
})

module.exports = router;