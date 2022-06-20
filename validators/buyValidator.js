const {check} = require('express-validator')

module.exports = [
    check('user')
    .exists().withMessage('Vui lòng đăng nhập')
    .notEmpty().withMessage('Vui lòng đăng nhập'),

    check('cart')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),
    
    check('city.item')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('city.name')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('district')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('address')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên người dùng')
    .notEmpty().withMessage('Vui lòng cung cấp tên người dùng'),

    check("phone")
    .exists().withMessage("Vui lòng cung cấp số điện thoại")
    .notEmpty().withMessage("Vui lòng cung cấp số điện thoại")
    .custom((value) => {
        if (value.length > 10) {
            throw new Error("Số điện thoại không ngắn quá 10 số")
        }
        return true;
    }),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Vui lòng cung cấp địa chỉ email')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('shipper.item')
    .exists().withMessage('Vui lòng chọn nhà vận chuyển')
    .notEmpty().withMessage('Vui lòng chọn nhà vận chuyển'),

    check('shipper.price')
    .exists().withMessage('Vui lòng chọn nhà vận chuyển')
    .notEmpty().withMessage('Vui lòng chọn nhà vận chuyển')
    .custom((value) => {
        if (parseInt(value) <= 0) {
            throw new Error("Vui lòng chọn nhà vận chuyển")
        }
        return true
    }),

    check('note')
    .exists().withMessage('Vui lòng cung cấp ghi chú về đơn đặt hàng')
    .notEmpty().withMessage('Vui lòng cung cấp ghi chú về đơn đặt hàng'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp xác thực mật khẩu')
    .notEmpty().withMessage('Vui lòng cung cấp xác thực mật khẩu'),
]