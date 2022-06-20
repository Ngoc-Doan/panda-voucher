const Brand = require('../models/brand')
const Category = require('../models/category')
const Group = require('../models/group')
const City = require('../models/city')
const Shipper = require('../models/shipper')
const Recommend = require('../models/recommend')
const Banner = require('../models/banner')
const Tab = require('../models/tab')
const Footer = require('../models/footer')
const User = require('../models/user')

module.exports = {
    getDataLeftSidebar:async function(req, res, next) {
        try {
            var allBrand = await City.find().populate("brand").catch((err) => {
                res.status(500).json({
                    code: 500,
                    success: false,
                    error: err.message
                });
            });
            var allCate = await Group.find().populate("category").catch((err) => {
                res.status(500).json({
                    code: 500,
                    success: false,
                    error: err.message
                });
            });
            if (allBrand.length == 0) {
                throw new Error('Không có brand nào tồn tại trong database.')
            }
            if (allCate.length == 0) {
                throw new Error('Không có category nào tồn tại trong database.')
            }
            
            req.vars = {brands: allBrand, categories: allCate}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    },

    getDataShipper: async function(req, res, next) {
        try {
            var allShipper = await Shipper.find().populate({
                path: 'city',
                populate: {
                    path: 'item',
                    select: '_id name'
                }
            }).catch((err) => {
                res.status(500).json({
                    code: 500,
                    success: false,
                    error: err.message
                });
            });

            if (allShipper.length == 0) {
                throw new Error('Không có Shipper nào tồn tại trong database.')
            }
            // gán lại các biến
            const {brands, categories} = req.vars
            req.vars = {shippers: allShipper, brands: brands, categories: categories}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    },

    getDataRecommend: async function(req, res, next) {
        try {
            var recommend = await Recommend.find().populate('voucher').exec()

            if (recommend.length == 0) {
                throw new Error('Không có Recommend nào tồn tại trong database.')
            }

            req.recommend = {recommend}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    },

    getDataBanner: async function(req, res, next) {
        try {
            var banner = await Banner.find().populate('voucher').exec()

            if (banner.length == 0) {
                throw new Error('Không có Recommend nào tồn tại trong database.')
            }

            req.banner = {banner}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    },

    getDataTab: async function(req, res, next) {
        try {
            var tab = await Tab.find().populate('category').populate('voucher').exec()

            if (tab.length == 0) {
                throw new Error('Không có tab nào tồn tại trong database.')
            }

            req.tab = {tab}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    },
    getDataFooter: async function(req, res, next) {
        try {
            var footer = await Footer.find().populate('voucher').limit(4).exec()

            if(footer.length == 0) {
                throw new Error('Không có footer nào tồn tại trong database.')
            }
            req.footer = {footer}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    },

    getDataPermissionUser: async function(req, res, next) {
        try {
            var permissions = await User.findById(req.user._id).populate({
                path: 'permission',
                options: {
                    sort: {num: 1}
                }
            }).select('permission')
            req.permission = {permissions}
            next()
        } catch (error) {
            res.render('error')
            next()
        }
    
    }
}