var express = require('express');
var router = express.Router();

const Voucher = require('../models/voucher')
const Brand = require('../models/brand')
const Category = require('../models/category')
const Review = require('../models/review')

const moment = require('moment')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const {id} = req.query
    var {brands, categories} = req.vars
    var {recommend} = req.recommend
    var {footer} = req.footer

    let perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
    let page = 1;
    Voucher.findById(id)
    .populate({
        path: "brand"
    })
    .populate({
        path: "category"
    })
    .then(async voucher => {
        if (voucher) {
            var review = await Review.find({voucher: voucher._id})
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .sort({date: 'desc'}).exec().catch(e => {throw new Error(e.message)})
            if (review.length == 0) {
                review = []
            }

            var count = await Review.countDocuments({voucher: voucher._id, validation: true})
            res.render('detail', {
                user: req.user,
                voucher: voucher,
                categories: categories,
                brands: brands,
                recommend,
                review,
                moment,
                pages: Math.ceil(count / perPage),
                countReview: count,
                footer
            })
        }else {
            throw new Error(`Voucher không tồn tại`)
        }
    })
    .catch((err) => {
        return res.status(500).json({
            code: 500,
            status: false,
            error: err.message,
        });
    });
});

module.exports = router;