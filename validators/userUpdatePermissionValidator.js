const {check} = require('express-validator')
module.exports = [
    check('user')
    .exists().withMessage('Vui lòng đăng nhập')
    .notEmpty().withMessage('Vui lòng đăng nhập'),

    check('permission')
    .exists().withMessage('Vui lòng chọn quyền cho nhân viên')
    .notEmpty().withMessage('Vui lòng chọn quyền cho nhân viên')
    .custom((value) => {
        if (value.length == 0) {
            throw new Error("Vui lòng chọn quyền cho nhân viên")
        }
        return true
    }),

    check('password')
    .exists().withMessage('Vui lòng xác thực mật khẩu tài khoản')
    .notEmpty().withMessage('Vui lòng xác thực mật khẩu tài khoản')
]