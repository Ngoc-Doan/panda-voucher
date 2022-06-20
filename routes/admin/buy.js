var express = require('express');
var router = express.Router();

const Buy = require('../../models/buy')

const moment = require('moment')

const {authenticateTokenAdmin} = require('../../config/token')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')

router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('buys_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const {id} = req.query
        const buy = await Buy.findById(id).populate('shipper.item').populate('city.item').populate({
            path: 'products.voucher',
            select: '_id name image price'
        })
        res.render('admin/buy', {
            name_title: 'profile_buy',
            title: `Chi tiết đơn hàng ${buy._id}`,
            moment,
            buy,
            permissions
        })
    } catch (error) {
        return res.render('error')
    }

})

module.exports = router