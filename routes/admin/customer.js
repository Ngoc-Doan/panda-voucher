var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const User = require('../../models/user')
const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('customers_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        var users = await User.find({type: 'Customer'})
        res.render('admin/customer', {
            name_title: 'customers',
            title: 'Danh sách khách hàng',
            users,
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router