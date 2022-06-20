const {check} = require('express-validator')
module.exports = [
    check('old_password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu cũ')
    .notEmpty().withMessage('Vui lòng cung cấp mật khẩu cũ'),

    check('new_password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu mới')
    .notEmpty().withMessage('Vui lòng cung cấp mật khẩu mới')
    .custom((value) => {
        if (value.length < 6) {
            throw new Error("Mật khẩu không ngắn hơn 6 ký tự")
        }
        return true
    }),

    check('re_password')
    .exists().withMessage('Vui lòng nhập lại mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập lại mật khẩu')
    .custom((value, {req}) => {
        if (value !== req.body.new_password) {
            throw new Error("Nhập lại mật khẩu khác với mật khẩu mới")
        }
        return true;
    })
]