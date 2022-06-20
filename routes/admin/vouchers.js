var express = require('express');
var router = express.Router();

const Voucher = require('../../models/voucher')

const moment = require('moment')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('products_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const vouchers = await Voucher.find().populate("brand").populate('category')

        res.render('admin/vouchers', {
            title: 'Thông tin sản phẩm',
            name_title: 'vouchers',
            vouchers,
            moment,
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router