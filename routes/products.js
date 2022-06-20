var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')

const Voucher = require('../models/voucher')
const Brand = require('../models/brand')
const Category = require('../models/category')


/* GET home page. */
router.get('/',async function(req, res, next) {
    const {id, type} = req.query
    var {brands, categories} = req.vars
    var {footer} = req.footer
    if (type == 'cate') {
        var query = {
            category : id
        }
    }
    else if (type == 'brand') {
        var query = {
            brand : id
        }
    }
    try {
        var allVoucher = await Voucher.find(query)
        .populate({
            path: "brand"
        })
        .populate({
            path: "category"
        })
        if (allVoucher.length !== 0) {
            res.render('products', { user: req.user, vouchers: allVoucher , categories: categories, brands: brands,footer });
        }
        else {
            res.render('products', { user: req.user, vouchers: [] , categories: categories, brands: brands,footer });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: false,
            error: error.message
        });
    }
});

module.exports = router;