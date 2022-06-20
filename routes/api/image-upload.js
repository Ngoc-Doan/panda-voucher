var express = require('express');
var router = express.Router();

const {authenticateToken} = require('../../config/token')
const {uploadCloudinaryImage} = require('../../controllers/image-upload.controller')

router.post('/', uploadCloudinaryImage)

module.exports = router;