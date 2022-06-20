var express = require('express');
var router = express.Router();

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('add_new_staff_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    res.render('admin/add-staff', {
        permissions,
        user: req.user,
        name_title:'add-staff',
        title:'Thêm nhân viên mới'
    })
})

module.exports = router