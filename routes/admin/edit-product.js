var express = require('express');
var router = express.Router();

const Brand = require('../../models/brand')
const Category = require('../../models/category')
const Voucher = require('../../models/voucher')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission');

const moment = require('moment')
const voucher = require('../../models/voucher');
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    try {
        var {permissions} = req.permission
        let check = validatePermission('products_permission', permissions)
        if (!check) {
            return res.redirect('/admin/user')
        }
        const {id} = req.query

        const voucher = await Voucher.findById(id).populate('brand').populate('category')
        const brands = await Brand.find().select('_id name')
        const categories = await Category.find().select('_id name')
        res.render('admin/edit-product', {
            voucher,
            brands,
            categories,
            user: req.user,
            moment,
            title: 'Chỉnh sửa thông tin sản phẩm',
            name_title: 'edit-product',
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router