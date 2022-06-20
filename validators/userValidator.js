const {check} = require('express-validator')
module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp tên người dùng')
    .notEmpty().withMessage('Vui lòng nhập tên người dùng')
    .isLength({min: 6}).withMessage('Username không ngắn hơn 6 ký tự'),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ email')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại')
    .notEmpty().withMessage('Vui lòng nhập số điện thoại')
    .custom(value => {
        if (value.length != 10) {
            throw new Error('Số điện thoại phải là 10 số')
        }
        return true;
    }),

    check('url')
    .exists().withMessage('Vui lòng cung cấp thông tin trang mạng xã hội (FB, Instagram,...)')
    .notEmpty().withMessage('Vui lòng nhập thông tin trang mạng xã hội (FB, Instagram,...)'),

    check('street')
    .exists().withMessage('Vui lòng cung cấp địa chỉ nhà')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ nhà'),

    check('district')
    .exists().withMessage('Vui lòng cung cấp địa chỉ thông tin quận')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ thông tin quận'),

    check('city')
    .exists().withMessage('Vui lòng cung cấp địa chỉ thông tin thành phố')
    .notEmpty().withMessage('Vui lòng nhập địa chỉ thông tin thành phố'),

    check('code')
    .exists().withMessage('Vui lòng cung cấp zip code của thành phố')
    .notEmpty().withMessage('Vui lòng nhập zip code của thành phố'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp xác thực mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập xác thực mật khẩu'),
]