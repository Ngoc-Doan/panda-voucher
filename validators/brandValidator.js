const {check} = require('express-validator')

module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp tên thương hiệu')
    .notEmpty().withMessage('Vui lòng cung cấp tên thương hiệu'),

    check('address')
    .exists().withMessage('Vui lòng cung cấp địa chỉ')
    .notEmpty().withMessage('Vui lòng cung cấp địa chỉ'),

    check("phone")
    .exists().withMessage("Vui lòng cung cấp số điện thoại")
    .notEmpty().withMessage("Vui lòng cung cấp số điện thoại"),

    check("city")
    .exists().withMessage("Vui lòng chọn tỉnh thành")
    .notEmpty().withMessage("Vui lòng chọn tỉnh thành")
]