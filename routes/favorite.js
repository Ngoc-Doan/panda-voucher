var express = require('express');
var router = express.Router();

const Favorite = require('../models/favorite')

const {authenticateToken} = require('../config/token')

router.get('/', authenticateToken, async (req, res, next) => {
    try {
        var favorites = await Favorite.findOne({user: req.user._id}).populate({
            path: 'vouchers',
            populate: {
                path: 'category brand'
            }
        })
        var {brands, categories} = req.vars
        var {footer} = req.footer
        res.render('favorite', {
            user: req.user,
            brands,
            categories,
            footer,
            favorites
        })
    } catch (error) {
        res.redirect('./error')
    }
})

module.exports = router