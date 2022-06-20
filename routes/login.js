var express = require('express')
var router = express.Router()
const passport = require('passport')
const {ensureGuest} = require('../middleware/authentication')
const {generateAccessToken} = require('../config/token')
const fs = require('fs')
const multer = require('multer')
const fetch = require("node-fetch");

const {validationResult} = require('express-validator')
const registerValidator = require('../validators/registerValidator')
const loginValidator = require('../validators/loginValidator')

const User = require('../models/user')

const UserBuilder = require('../pattern/UserBuilder')

const {hash, verify} = require('../config/crypto')

/* GET home page. */
router.get('/', ensureGuest, async function(req, res, next) {
	res.setHeader('Cache-Control', "max-age=86400")
	req.logOut()
	res.clearCookie('token')
	var {brands, categories} = req.vars
	var {footer} = req.footer
	res.render('login', {user: req.user, footer, categories, brands});
});


router.post('/', loginValidator, (req, res, next) => {
	let result = validationResult(req)
	if (result.errors.length === 0) {
		passport.authenticate('local-login',{
			successRedirect: '/',
			failureRedirect: '/login',
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
			// console.log(token)
			res.cookie('token', token)
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

router.post('/register', registerValidator,async (req, res, next) => {
	let result = validationResult(req)
	let cookie = req.cookies
	if (result.errors.length === 0) {
		const {name, username, email, password, img} = req.body
		await User.findOne({username: username}).then(acc => {
			if (acc) {
				throw new Error("Username người dùng đăng ký đã tồn tại")
			}
		}).then(async () => {
			await User.findOne({email: email}).then(acc => {
				if (acc) {
					throw new Error("Email người dùng đăng ký đã tồn tại")
				}
			})
		})
		.then(() => {return hash(password)})
		.then(async passHashed => {
			// let imgData = img.replace(/^data:image\/\w+;base64,/, "")
			// let user = new User({
			// 	type: 'Customer',
			// 	name: name,
			// 	username: username,
			// 	password: passHashed,
			// 	email: email
			// })
			let user = new UserBuilder()
			.setType('Customer')
			.setName(name)
			.setUsername(username)
			.setPassword(passHashed)
			.setEmail(email)
			.buildInfo()
			if (img !== 'undefined') {
				let image = {
					image : img,
					image_name : user._id,
					folder: `users/${user._id}`
				}
				// let buf = Buffer.from(imgData, 'base64')
				// fs.writeFileSync(`public/images/user/${username}.png`, buf)
				// user.image = `images/user/${username}.png`
				await fetch(`${process.env.URL}/api/image-upload`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Cookie': `connect.sid=${cookie['connect.sid']};token=${cookie.token}`
					},
					body: JSON.stringify(image)
				})
				.then(res => res.text())
				.then(async data => {
					data = JSON.parse(data)
					if (data.status) {
						user.image = data.result.url
						return await user.save()
					}
				})
				.then(newAcc => {
					if (newAcc) {
						return res.status(500).json({
							status: true,
							message: 'Đăng ký người dùng mới thành công',
							user: {
								username,
								email,
								name
							}
						})
					}
					else {
						throw new Error('Đăng ký người dùng mới thất bại')
					}
				}).catch(e => {
					return res.status(500).json({
						status: false,
						error: e.message
					})
				})
			}
			else {
				user.save()
				.then(newAcc => {
					if (newAcc) {
						return res.status(500).json({
							status: true,
							message: 'Đăng ký người dùng mới thành công',
							user: {
								username,
								email,
								name
							}
						})
					}
					else {
						throw new Error('Đăng ký người dùng mới thất bại')
					}
				}).catch(e => {
					return res.status(500).json({
						status: false,
						error: e.message
					})
				})
			}
		})
		.catch(e => {
			return res.status(500).json({
				status: false,
				error: e.message
			})
		})
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
	res.clearCookie('token')
	res.redirect('/login')
});

module.exports = router;