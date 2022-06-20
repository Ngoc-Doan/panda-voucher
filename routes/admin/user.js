var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission

    res.render('admin/user', {
        user: req.user,
        title: 'Thông tin quản trị',
        name_title: 'user',
        permissions
    })
})

module.exports = router