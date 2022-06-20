var express = require('express');
var router = express.Router();
const User = require('../../models/user')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('staffs_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }

    const {id} = req.query
    const user = await User.findById(id)

    res.render('admin/edit-user', {
        mainUser: req.user,
        user: user,
        title: 'Chỉnh sửa thông tin nhân viên',
        name_title: 'edit-user',
        permissions: permissions
    })
})

module.exports = router