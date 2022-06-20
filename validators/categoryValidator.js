const {check} = require('express-validator')

module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp tên phân loại')
    .notEmpty().withMessage('Vui lòng cung cấp tên phân loại'),

    check("group")
    .exists().withMessage("Vui lòng chọn nhóm phân loại")
    .notEmpty().withMessage("Vui lòng chọn nhóm phân loại")
]