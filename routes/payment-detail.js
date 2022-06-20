var express = require('express');
var router = express.Router();

const Buy = require('./../models/buy')
const {authenticateToken} = require('../config/token')

const moment = require('moment')

router.get('/', authenticateToken, async (req, res, next) => {
    const {id} = req.query
    var {brands, categories} = req.vars
    var {footer} = req.footer
    try {
        if (!req.user) {
            return res.redirect("login/logout")
        }
        if (!id) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }

        var buy = await Buy.findById(id).populate({
            path:'shipper',
            populate: {
                path: 'item',
                select: 'name'
            }
        })
        .populate({
            path: 'products',
            populate: {
                path: 'voucher'
            }
        })
        .exec()

        if (!buy || buy == undefined || buy == null) {
            throw new Error('Không tìm thấy id, vui lòng refresh lại trang')
        }
        else {
            res.render('payment-detail', {buy : buy, user: req.user,moment: moment,categories,footer,brands})
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }

})

module.exports = router;