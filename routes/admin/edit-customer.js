var express = require('express');
var router = express.Router();

const User = require('../../models/user')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission');

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    try {
        var {permissions} = req.permission
        let check = validatePermission('customers_permission', permissions)
        if (!check) {
            return res.redirect('/admin/user')
        }
        const {id} = req.query
        const user = await User.findById(id)
        res.render('admin/edit-customer', {
            user,
            mainUser: req.user,
            title: 'Chỉnh sửa thông tin khách hàng',
            name_title: 'edit-customer',
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router