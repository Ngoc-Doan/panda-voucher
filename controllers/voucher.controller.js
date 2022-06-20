const Voucher = require('../models/voucher')
// phải khai báo các model mà sử dụng population
const Brand = require('../models/brand')
const Category = require('../models/category')
const Review = require('../models/review')
const Buy = require('../models/buy')
const Cart = require('../models/cart')

const VoucherBuilder = require('../pattern/VoucherBuilder')

const fetch = require("node-fetch");

const {validationResult} = require('express-validator')

const cloudinary = require('cloudinary').v2

// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

async function getAllVoucher(req, res, next) {
    Voucher.find()
    .populate({
        path: "brand"
    })
    .populate({
        path: "category"
    })
    .then(allVoucher => {
        if (allVoucher.length !== 0) {
            return res.status(200).json({
                status: true,
                message: 'Tất cả vouchers',
                voucher: allVoucher,
            });
        }
        else {
            throw new Error('Không có product nào tồn tại trong database.')
        }
    })
    .catch((err) => {
        res.status(500).json({
            code: 500,
            status: false,
            error: err.message
        });
    });
}

async function getLimitVoucher(req, res, next) {
    try {
        var {page} = req.params
        var perPage = 9
        var vouchers = await Voucher.find()
        .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .populate({
            path: "brand"
        })
        .populate({
            path: "category"
        }).exec()
        
        if (vouchers.length == 0) {
            throw new Error('Lỗi xảy ra, vui lòng thử lại')
        }
        res.status(200).json({
            status: true,
            vouchers: vouchers,
            message:'Load trang mới thành công'
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: false,
            error: err.message
        });
    }
}

async function addVoucher(req, res, next) {
    let cookie = req.cookies
    let result = validationResult(req)
    if (result.errors.length === 0) {
        var {price, name, brand, category, desc, expirationDate, availability, image} = req.body
        const imageUrlArray = []
        const voucher = new VoucherBuilder()
        .setName(name)
        .setPrice(price)
        .setBrand(brand)
        .setCategory(category)
        .setDescription(desc)
        .setExpirationDate(expirationDate)
        .setAvailability(availability)
        .buildInfo()
        for (var i = 0; i < image.length; i++) {
            let queryImg = {
                image : image[i],
                image_name : `${voucher._id}_${i+1}`,
                folder: `vouchers/${voucher._id}`
            }
            const url = await fetch(`${process.env.URL}/api/image-upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `connect.sid=${cookie['connect.sid']};token=${cookie.token}`
                },
                body: JSON.stringify(queryImg)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                if (data.status) {
                    return data.result.url
                }
            }).catch(error => {
                return res.status(500).json({
                    status: false,
                    error: error.message
                })
            })
            imageUrlArray.push(url)
        }
        voucher.image = imageUrlArray
        try {
            const newVoucher = voucher.save()
            if (newVoucher == null || newVoucher == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
            else {
                res.status(200).json({
                    status: true,
                    message: 'Thêm sản phẩm mới thành công',
                    Voucher: newVoucher
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        }
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
}

async function updateVoucherById(req, res, next) {
    let cookie = req.cookies
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const {id} = req.params
        var {price, name, brand, category, desc, expirationDate, availability, image} = req.body
        const imageUrlArray = []
        const voucher = {
            name,
            price,
            brand,
            category,
            desc,
            expirationDate,
            Availability: availability
        }
        if (image != undefined && image.length != 0 && image != null) {
            for (var i = 0; i < image.length; i++) {
                let queryImg = {
                    image : image[i],
                    image_name : `${voucher._id}_${i+1}`,
                    folder: `vouchers/${voucher._id}`
                }
                const url = await fetch(`${process.env.URL}/api/image-upload`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `connect.sid=${cookie['connect.sid']};token=${cookie.token}`
                    },
                    body: JSON.stringify(queryImg)
                }).then(res => res.text())
                .then(data => {
                    data = JSON.parse(data)
                    if (data.status) {
                        return data.result.url
                    }
                }).catch(error => {
                    return res.status(500).json({
                        status: false,
                        error: error.message
                    })
                })
                imageUrlArray.push(url)
            }
            voucher.image = imageUrlArray
        }

        try {
            const newVoucher = await Voucher.findByIdAndUpdate(id, voucher, {new: true, useFindAndModify: false})
            if (newVoucher == null || newVoucher == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
            else {
                res.status(200).json({
                    status: true,
                    message: 'Cập nhật sản phẩm thành công',
                    Voucher: newVoucher
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        }
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
}

async function deleteVoucherById(req, res, next) {
    try {
        const {id} = req.params

        const imageFolder = await Voucher.findById(id).select('image')

        for (let index = 0; index < imageFolder.image.length; index++) {
            cloudinary.uploader.destroy(`vouchers/${id}/${id}_${index + 1}`)
        }

        await Buy.deleteMany({'products.voucher': id}).then(async data => {
            await Cart.deleteMany({'products.voucher': id}).then(async data => {
                await Review.findOneAndRemove({voucher: id}, {useFindAndModify: false})
                .then(async () => {
                    try {
                        await Voucher.findByIdAndRemove(id, {useFindAndModify: false})
                        .then(async () => {
                            // chưa xoá dc folder chứa ảnh của sản phẩm - cloudinary
                            cloudinary.api.delete_folder(`vouchers/${id}`)
                            return res.status(200).json({
                                status: true,
                                message: 'Xoá sản phẩm thành công'
                            })
                        })
                    } catch (error) {
                        throw new Error(error)
                    }
                })
            }).catch(e => {
                throw new Error(e)
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

module.exports = {getAllVoucher, getLimitVoucher, addVoucher, updateVoucherById, deleteVoucherById}