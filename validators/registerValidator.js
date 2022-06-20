const {check} = require('express-validator')
module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp tên người dùng')
    .notEmpty().withMessage('Vui lòng nhập tên người dùng'),

    check('username')
    .exists().withMessage('Vui lòng cung cấp tên người dùng')
    .notEmpty().withMessage('Vui lòng nhập tên người dùng')
    .isLength({min: 6}).withMessage('Username không ngắn hơn 6 ký tự'),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ email')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập mật khẩu')
    .isLength({min: 6}).withMessage('Mật khẩu không ngắn hơn 6 ký tự'),

    check("re_password").exists().withMessage("Vui lòng nhập xác thực password")
    .notEmpty().withMessage("Xác thực password không được để trống")
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Xác thực password không giống với password vừa nhập")
        }
        return true;
    })
]