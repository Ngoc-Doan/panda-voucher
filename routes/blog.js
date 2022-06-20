var express = require('express');
var router = express.Router();

const Blog = require('../models/blog')

const moment = require('moment')

router.get('/', async function(req, res, next) {
    try {
        var {footer} = req.footer
        var {brands, categories} = req.vars

        const blogs = await Blog.find().populate({
            path: 'user',
            select: 'name'
        })

        if (blogs.length == 0) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }
        res.render('blog', {
            user: req.user,
            footer,
            brands,
            categories,
            blogs,
            moment
        });
    } catch (error) {
        res.render('error')
    }

});

module.exports = router;