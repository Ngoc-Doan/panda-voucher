var express = require('express');
var router = express.Router();

const {getShipperById} = require('../../controllers/shipper.controller')

router.get('/:id', getShipperById)

module.exports = router;