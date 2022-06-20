const {check} = require('express-validator')

module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp họ tên của bạn')
    .notEmpty().withMessage('Vui lòng cung cấp họ tên của bạn'),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ email')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('title')
    .exists().withMessage('Vui lòng cung cấp tiêu đề')
    .notEmpty().withMessage('Vui lòng cung cấp tiêu đề'),

    check('message')
    .exists().withMessage('Vui lòng cung cấp tin nhắn mà bạn cần gửi')
    .notEmpty().withMessage('Vui lòng cung cấp tin nhắn mà bạn cần gửi')
]