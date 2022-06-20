var express = require('express');
var router = express.Router();

const contactValidator = require('../../validators/contactValidator')
const {addContact} = require('../../controllers/contact.controller')

router.post('/', contactValidator, addContact)

module.exports = router;