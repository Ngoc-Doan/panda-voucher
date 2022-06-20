var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../config/token')

/* GET users listing. */
router.get('/', authenticateToken, function(req, res, next) {
  if (req.user) {
    var {brands, categories} = req.vars
    var {footer} = req.footer
    user = req.user
    if (user.image === undefined) {
      user.image = 'https://bootdey.com/img/Content/avatar/avatar1.png'
    }
  }
  else {
    user = undefined
  }
  res.render('profile', {user : user, footer, categories, brands});
});

module.exports = router;
