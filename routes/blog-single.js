var express = require('express');
var router = express.Router();

const Blog = require('../models/blog')

const moment = require('moment')

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const {id} = req.query

        const singleBlog = await Blog.findById(id).populate({
            path:'user',
            select: 'name'
        })

        var {footer} = req.footer
        var {brands, categories} = req.vars
        res.render('blog-single', {
            user: req.user,
            footer,
            brands,
            categories,
            moment,
            singleBlog
        });
    } catch (error) {
        res.render('error')
    }

});

module.exports = router;