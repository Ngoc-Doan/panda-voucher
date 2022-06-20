const {check} = require('express-validator')

module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp tên sản phẩm')
    .notEmpty().withMessage('Vui lòng cung cấp tên sản phẩm'),

    check('price')
    .exists().withMessage('Vui lòng cung cấp giá tiền sản phẩm')
    .notEmpty().withMessage('Vui lòng cung cấp giá tiền sản phẩm')
    .custom((value) => {
        if (value <= 0) {
            throw new Error("Giá tiền sản phẩm không được là số âm")
        }
        return true;
    }),

    check('brand')
    .exists().withMessage('Vui lòng chọn tên thương hiệu')
    .notEmpty().withMessage('Vui lòng chọn tên thương hiệu'),

    check('category')
    .exists().withMessage('Vui lòng chọn nhóm phân loại')
    .notEmpty().withMessage('Vui lòng chọn nhóm phân loại'),

    check('expirationDate')
    .exists().withMessage('Vui lòng chọn ngày hết hạn sản phẩm')
    .notEmpty().withMessage('Vui lòng chọn ngày hết hạn sản phẩm')
    .custom((value) => {
        const d1 = new Date(value)
        const today = new Date()
        if (d1 <= today) {
            throw new Error("Sản phẩm quá ngày hết hạn so với ngày hôm nay")
        }
        return true;
    }),

    check('availability')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('desc')
    .exists().withMessage('Vui lòng mô tả sản phẩm')
    .notEmpty().withMessage('Vui lòng mô tả sản phẩm'),
]