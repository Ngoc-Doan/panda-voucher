var express = require('express');
var router = express.Router();
const {authenticateTokenAdmin} = require('../../config/token')

const Contact = require('../../models/contact')

const {getDataPermissionUser} = require('../../middleware/variable')

const {validatePermission} = require('../../config/permission')
router.get('/', authenticateTokenAdmin, getDataPermissionUser, async (req, res, next) => {
    var {permissions} = req.permission
    let check = validatePermission('questions_permission', permissions)
    if (!check) {
        return res.redirect('/admin/user')
    }
    try {
        const contacts = await Contact.find()

        res.render('admin/question', {
            title:'Danh sách khách vãng lai hỏi đáp',
            name_title: 'questions',
            contacts,
            permissions
        })
    } catch (error) {
        res.render('error')
    }
})

module.exports = router