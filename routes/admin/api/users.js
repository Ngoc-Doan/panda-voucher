var express = require('express');
var router = express.Router();

var userValidator = require('../../../validators/userValidator')
var userUpdatePermissionValidator = require('../../../validators/userUpdatePermissionValidator')
var userUpdateStaffUser = require('../../../validators/userUpdateStaffUser')
var userUpdatePasswordValidator = require('../../../validators/userUpdatePasswordValidator')
var addStaffUserValidator = require('../../../validators/addStaffValidator')
var userUpdateCustomerValidator = require('../../../validators/updateCustomerValidator')

var {updateUserId, updatePermissionById, updateUserStaffById, updatePasswordById, addStaffUser, updateAvatarUserById, deleteUserById, updateUserCustomerById, deleteUserCustomerById} = require('../../../controllers/user.controller')

const {authenticateTokenAdmin} = require('../../../config/token')

router.put('/:id', authenticateTokenAdmin, userValidator, updateUserId)

router.put('/permission/:id', authenticateTokenAdmin, userUpdatePermissionValidator, updatePermissionById)

router.put('/staff/:id', authenticateTokenAdmin, userUpdateStaffUser, updateUserStaffById)

router.put('/password/:id', authenticateTokenAdmin, userUpdatePasswordValidator, updatePasswordById)

router.post('/staff', authenticateTokenAdmin, addStaffUserValidator, addStaffUser)

router.put('/image/:id', authenticateTokenAdmin, updateAvatarUserById)

router.delete('/:id', authenticateTokenAdmin, deleteUserById)

router.put('/customer/:id', authenticateTokenAdmin, userUpdateCustomerValidator, updateUserCustomerById)

router.delete('/customer/:id', authenticateTokenAdmin, deleteUserCustomerById)

module.exports = router