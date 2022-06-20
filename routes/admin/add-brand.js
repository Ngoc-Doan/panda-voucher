var express = require('express');
var router = express.Router();

const City = require('../../models/city')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('add_new_brands_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        var cities = await City.find().select('_id name')

        if (cities.length == 0) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }

        res.render('admin/add-brand', {
            title: 'Thêm thương hiệu mới',
            name_title: 'add-brand',
            cities,
            permissions
        })
    
    } catch (error) {
        res.render('error')
    }
})

module.exports = router