var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const Review = require('../../models/review')

const moment = require('moment')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('reviews_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        var reviews = await Review.find().populate({
            path: 'voucher',
            select: '_id name image'
        })

        res.render('admin/review', {
            name_title: 'reviews',
            title: 'Danh sách đánh giá của khách hàng',
            reviews,
            moment,
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router