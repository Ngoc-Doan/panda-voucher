var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    res.render('admin/password', {
        user: req.user,
        name_title: 'passwords',
        title: 'Thay đổi mật khẩu',
        permissions
    })
})

module.exports = router