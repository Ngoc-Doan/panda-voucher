var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const Permission = require('../../models/permission')
const User = require('../../models/user')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('select_each_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const permissionSelect = await Permission.find()

        const staffs = await User.find({type: 'Admin'})
        res.render('admin/permission', {
            user: req.user,
            title: 'Phân quyền nhân viên',
            name_title: 'permissions',
            permissionSelect,
            permissions,
            staffs
        })
    } catch (error) {
        res.render('error')
    }

})

module.exports = router