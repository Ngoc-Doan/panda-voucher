const {check} = require('express-validator')

module.exports = [
    check('voucher')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('star')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên người dùng')
    .notEmpty().withMessage('Vui lòng nhập cung cấp người dùng'),

    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Vui lòng cung cấp địa chỉ email')
    .isEmail().withMessage('Địa chỉ email không hợp lệ vui lòng nhập lại'),

    check('review')
    .exists().withMessage('Vui lòng đánh giá sản phẩm')
    .notEmpty().withMessage('Vui lòng đánh giá sản phẩm')
]