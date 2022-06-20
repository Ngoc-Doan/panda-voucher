var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var {footer} = req.footer
    var {brands, categories} = req.vars
    res.render('contact-us', {
        footer,
        brands,
        categories,
        user: req.user
    });
});

module.exports = router;