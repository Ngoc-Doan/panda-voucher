var express = require('express');
var router = express.Router();
const passport = require('passport')
const {ensureAdmin} = require('../../middleware/authentication')
const {generateAccessToken} = require('../../config/token')

const {validationResult} = require('express-validator')
const loginValidator = require('../../validators/loginValidator')

const User = require('../../models/user')

router.get('/', ensureAdmin, async function(req, res, next) {
	res.setHeader('Cache-Control', "max-age=86400")
	req.logOut()
	res.clearCookie('token')
	res.render('admin/login', {user: req.user});
});

router.post('/', loginValidator, (req, res, next) => {
	let result = validationResult(req)
	if (result.errors.length === 0) {
		passport.authenticate('local-login-admin',{
			successRedirect: '/admin/dashboard',
			failureRedirect: '/22012000/login',
			failureFlash: true,
		}, function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(500).json({
				status: false,
				error: info.message
			})
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			const token = generateAccessToken({ userId: user.id, type:user.type})
			res.cookie('tokenAdmin', token)
			return res.json({token:token});
		});
		})(req, res, next);
	}
	else {
		let messages = result.mapped()
        let message = 'error - 404 not found'
        for (m in messages) {
            message = messages[m].msg
            break
        }
		return res.status(500).json({
			status: false,
			error: message
		})
	}
})

router.get('/logout', function (req, res, next) {
	req.logOut()
	res.clearCookie('tokenAdmin')
	res.redirect('/22012000/login')
});

module.exports = router