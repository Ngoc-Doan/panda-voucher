var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const User = require('../../models/user')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('staffs_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const staffs = await User.find({type: 'Admin'}).populate('permission').select('_id image name salary address district city phone email street username')

        res.render('admin/staff', {
            user: req.user,
            title: 'Danh sách nhân viên',
            name_title: 'staffs',
            staffs,
            permissions
        })
    } catch (error) {
        res.render('error')
    }

})

module.exports = router