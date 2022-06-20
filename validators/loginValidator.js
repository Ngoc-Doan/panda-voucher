const {check} = require('express-validator')

module.exports = [
    check('username')
    .exists().withMessage('Vui lòng cung cấp username')
    .notEmpty().withMessage('Vui lòng nhập username')
    .isLength({min: 6}).withMessage('Username không ngắn hơn 6 ký tự'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập mật khẩu')
    .isLength({min: 6}).withMessage('Mật khẩu không ngắn hơn 6 ký tự')
]