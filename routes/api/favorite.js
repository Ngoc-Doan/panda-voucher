var express = require('express');
var router = express.Router();

const {addFavorite, deleteFavoriteByUserId} = require('../../controllers/favorite.controller')

const {authenticateToken} = require('../../config/token')

router.post('/', addFavorite)

router.delete('/:user/:voucher', deleteFavoriteByUserId)

module.exports = router