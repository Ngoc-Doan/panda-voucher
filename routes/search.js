var express = require('express');
var router = express.Router();

const Voucher = require('../models/voucher')

router.get('/', async function(req, res, next) {
    var {brands, categories} = req.vars
    var {footer} = req.footer
    var {keyword, range} = req.query
    var vouchers = []
    let perPage = 21; // số lượng sản phẩm xuất hiện trên 1 page
    let page = 1;
    try {
        var count = await Voucher.countDocuments()
        if (count == 0) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }
        if (range == undefined && keyword) {
            vouchers = await Voucher.find({
                name: new RegExp(keyword, 'i')
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
        }
        else if (keyword == undefined && range){
            vouchers = await Voucher.find({
                price: {$gte: 0, $lte: range}
            })
            .sort({price: 'desc'})
            .skip((perPage * page) - perPage)
            .limit(perPage)
        }

        res.render('search', {user: req.user, vouchers , categories: categories, brands: brands, footer})
    } catch (error) {
        res.render('search', {user: req.user, vouchers: [] , categories: categories, brands: brands, footer})
    }
});

module.exports = router;