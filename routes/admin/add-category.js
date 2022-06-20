var express = require('express');
var router = express.Router();

const Group = require('../../models/group')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('add_new_category_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const groups = await Group.find()

        if (groups.length == 0) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }

        res.render('admin/add-category', {
            title: 'Thêm nhóm phân loại mới',
            name_title: 'add-category',
            groups,
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router