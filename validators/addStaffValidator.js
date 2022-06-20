const {check} = require('express-validator')
var isValidUsername = require('is-valid-username');

module.exports = [
    check('id')
    .exists().withMessage('Vui lòng đăng nhập')
    .notEmpty().withMessage('Vui lòng đăng nhập'),

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên nhân viên')
    .notEmpty().withMessage('Vui lòng nhập tên nhân viên'),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ email')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('username')
    .exists().withMessage('Vui lòng cung cấp tên đăng nhập')
    .notEmpty().withMessage('Vui lòng cung cấp tên đăng nhập')
    .isLength({min: 6}).withMessage('Tên đăng nhập phải trên 6 ký tự')
    .custom(value => {
        if (!isValidUsername(value)) {
            throw new Error("Tên đăng nhập không hợp lệ, vui lòng nhập tên mới")
        }
        return true;
    }),

    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại')
    .notEmpty().withMessage('Vui lòng nhập số điện thoại')
    .custom(value => {
        if (value.length != 10) {
            throw new Error('Số điện thoại phải là 10 số')
        }
        return true;
    }),

    check('salary')
    .exists().withMessage('Vui lòng cung cấp lương cơ bản của nhân viên')
    .notEmpty().withMessage('Vui lòng cung cấp lương cơ bản của nhân viên'),

    check('image')
    .exists().withMessage('Vui lòng cung cấp ảnh đại diện nhân viên')
    .notEmpty().withMessage('Vui lòng cung cấp ảnh đại diện nhân viên'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Vui lòng cung cấp mật khẩu'),

    check('re_password')
    .exists().withMessage('Vui lòng nhập lại mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập lại mật khẩu')
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Nhập lại mật khẩu khác mật khẩu mới")
        }
        return true;
    }),

    check('valid_password')
    .exists().withMessage('Vui lòng cung cấp xác thực mật khẩu')
    .notEmpty().withMessage('Vui lòng cung cấp xác thực mật khẩu'),
]