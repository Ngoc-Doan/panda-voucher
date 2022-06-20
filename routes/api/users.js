var express = require('express');
var router = express.Router();

const {authenticateToken} = require('../../config/token')

const {updateUserId, updateAvatarUserById, updatePasswordById} = require('../../controllers/user.controller')

const userValidator = require('../../validators/userValidator')

var userUpdatePasswordValidator = require('../../validators/userUpdatePasswordValidator')

router.put('/:id', authenticateToken, userValidator, updateUserId)

router.put('/image/:id', authenticateToken, updateAvatarUserById)

router.put('/password/:id', authenticateToken, userUpdatePasswordValidator, updatePasswordById)

module.exports = router;