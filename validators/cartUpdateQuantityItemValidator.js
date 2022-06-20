const {check} = require('express-validator')
module.exports = [
    check('user')
    .exists().withMessage('Vui lòng đăng nhập')
    .notEmpty().withMessage('Vui lòng đăng nhập'),
    
    check('product')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang'),

    check('amount')
    .exists().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .notEmpty().withMessage('Lỗi xảy ra, vui lòng refresh lại trang')
    .custom((value) => {
        if (parseInt(value) == 0) {
            throw new Error("Số lượng sản phẩm bằng 0, vui lòng nhập lại")
        }
        return true
    }),
]