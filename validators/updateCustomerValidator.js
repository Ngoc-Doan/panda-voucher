const {check} = require('express-validator')
module.exports = [
    check('mainUser')
    .exists().withMessage('Vui lòng đăng nhập')
    .notEmpty().withMessage('Vui lòng đăng nhập'),

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên Khách hàng')
    .notEmpty().withMessage('Vui lòng nhập tên Khách hàng'),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email khách hàng')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ email khách hàng')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại khách hàng')
    .notEmpty().withMessage('Vui lòng nhập số điện thoại khách hàng')
    .custom(value => {
        if (value.length != 10) {
            throw new Error('Số điện thoại phải là 10 số')
        }
        return true;
    }),

    check('street')
    .exists().withMessage('Vui lòng cung cấp địa chỉ nhà')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ nhà'),

    check('district')
    .exists().withMessage('Vui lòng cung cấp địa chỉ thông tin quận')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ thông tin quận'),

    check('city')
    .exists().withMessage('Vui lòng cung cấp địa chỉ thông tin thành phố')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ thông tin thành phố'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp xác thực mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập xác thực mật khẩu'),
]