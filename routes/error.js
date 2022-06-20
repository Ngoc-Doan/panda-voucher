var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var {brands, categories} = req.vars
    var {footer} = req.footer
    res.render('error', {
        footer,
        brands,
        categories
    });
});

module.exports = router;