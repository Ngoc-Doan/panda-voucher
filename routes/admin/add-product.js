var express = require('express');
var router = express.Router();

const Brand = require('../../models/brand')
const Category = require('../../models/category')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('add_new_products_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const brands = await Brand.find().select('_id name')
        const categories = await Category.find().select('_id name')
        res.render('admin/add-product', {
            title: "Thêm sản phẩm mới",
            name_title: 'add-product',
            brands,
            categories,
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router