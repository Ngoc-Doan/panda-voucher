var express = require('express');
var router = express.Router();

const Voucher = require('../models/voucher')
const Brand = require('../models/brand')
const Category = require('../models/category')

/* GET home page. */
router.get('/', function(req, res, next) {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    let page = 1;
    Voucher.find()
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .populate({
        path: "brand"
    })
    .populate({
        path: "category"
    })
    .then(async allVoucher => {
        if (allVoucher.length !== 0) {
            try {
                var count = await Voucher.countDocuments()
                if (count == 0) {
                    throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
                }
                var {brands, categories} = req.vars
                var {recommend} = req.recommend
                var {banner} = req.banner
                var {tab} = req.tab
                var {footer} = req.footer
                res.render('index', { user: req.user,
                    vouchers: allVoucher,
                    categories: categories,
                    brands: brands,
                    pages: Math.ceil(count / perPage),
                    recommend,
                    banner,
                    tab,
                    footer});
            } catch (error) {
                res.status(500).json({
                    code: 500,
                    status: false,
                    error: error.message
            });
            }
        }
        else {
            throw new Error('Không có product nào tồn tại trong database.')
        }
    })
    .catch((err) => {
        res.status(500).json({
            code: 500,
            status: false,
            error: err.message
        });
    });
});

module.exports = router;
