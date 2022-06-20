const Contact = require('../models/contact')

const {validationResult} = require('express-validator')

async function addContact(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const {name, email, title, message} = req.body
        const contact = new Contact({
            name,
            email,
            title,
            message
        })
        try {
            const newContact = await contact.save()
            if (newContact == null || newContact == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
            return res.status(200).json({
                status: true,
                message: 'Gửi yêu cầu thành công',
                Contact: newContact
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        }
    }
    else {
        let messages = result.mapped()
        let message = 'error - 404 not found'
        for (m in messages) {
            message = messages[m].msg
            break
        }
		return res.status(500).json({
			status: false,
			error: message
		})
    }
}

module.exports = {addContact}