var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const moment = require('moment')

const Buy = require('../../models/buy')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('buys_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {

        var buys = await Buy.find().populate({
            path:'shipper',
            populate: {
                path: 'item',
                select: 'name'
            }
        })
        .populate('user')
        .exec()

        res.render('admin/table', {
            title: "Danh sách dữ liệu",
            name_title: 'table',
            moment,
            buys,
            permissions
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: false,
            error: error.message
        })
    }

})

module.exports = router