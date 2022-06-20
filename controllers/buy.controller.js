const Buy = require('../models/buy')
const User = require('../models/user')
const Cart = require('../models/cart')

const BuyBuilder = require('../pattern/BuyBuilder');

const {validationResult} = require('express-validator')

const {hash, verify} = require('../config/crypto')

async function getAllBuy(req, res, next) {
    try {
        var allBuy = await Buy.find().populate({
            path: 'shipper',
            populate: {
                path: 'item',
                select: 'name'
            }
        }).sort({date: 'desc'})
        if (allBuy.length == 0) {
            throw new Error('Xảy ra lỗi, vui lòng refresh lại trang')
        }

        return res.status(200).json({
            status: true,
            message: 'Tất cả hoá đơn thanh toán',
            Buy: allBuy
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

async function addBuy(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        var {
            user,
            validation,
            check,
            name,
            phone,
            email,
            cart,
            shipper,
            address,
            district,
            city,
            note,
            password
        } = req.body
        try {
            let passHashed = await hash(password)

            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            var orderDate = new Date();

            // Kiểm tra xác thực mật khẩu
            var getUser = await User.findOne({_id: user,password : passHashed}).exec()
            if (getUser !== null) {
                var newCart = await Cart.findById(cart)
                if (newCart !== null) {
                    // Builder Pattern
                    const query = new BuyBuilder()
                    .setUser(user)
                    .setValidation(validation)
                    .setCheck(check)
                    .setName(name)
                    .setTotalPrice(newCart.totalPrice)
                    .setProducts(newCart.products)
                    .setPhone(phone)
                    .setEmail(email)
                    .setOrderDate(orderDate)
                    .setDeliveryDate(orderDate.addDays(3))
                    .setShipper(shipper)
                    .setAddress(address)
                    .setDistrict(district)
                    .setCity(city)
                    .setNote(note)
                    .buildInfo()
                    // Original
                    // const query = new Buy ({
                    //     user,
                    //     validation,
                    //     check,
                    //     name,
                    //     totalPrice: newCart.totalPrice,
                    //     products: newCart.products,
                    //     phone,
                    //     email,
                    //     orderDate,
                    //     deliveryDate: orderDate.addDays(3),
                    //     shipper,
                    //     address,
                    //     district,
                    //     city,
                    //     note
                    // })
                    var newBuy = await query.save()
                    if (newBuy !== null) {
                        return res.status(200).json({
                            status: true,
                            message: 'Thanh toán sản phẩm thành công',
                            Buy: newBuy
                        })
                    }
                    else {
                        throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
                    }
                }
                else {
                    throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
                }
            }
            else {
                throw new Error(`Xác thực mật khẩu sai, vui lòng thử lại`)
            }
        } catch (error) {
            res.status(500).json({
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
		res.status(500).json({
			status: false,
			error: message
		})
    }
}

async function addBuyAndDeleteCart(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        var {
            user,
            validation,
            check,
            name,
            phone,
            email,
            cart,
            shipper,
            address,
            district,
            city,
            note,
            password
        } = req.body
        try {
            let passHashed = await hash(password)

            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            var orderDate = new Date();

            // Kiểm tra xác thực mật khẩu
            var getUser = await User.findOne({_id: user,password : passHashed}).exec()
            if (getUser !== null) {
                var newCart = await Cart.findById(cart)
                if (newCart !== null) {
                    // Builder Pattern
                    const query = new BuyBuilder()
                    .setUser(user)
                    .setValidation(validation)
                    .setCheck(check)
                    .setName(name)
                    .setTotalPrice(newCart.totalPrice)
                    .setProducts(newCart.products)
                    .setPhone(phone)
                    .setEmail(email)
                    .setOrderDate(orderDate)
                    .setDeliveryDate(orderDate.addDays(3))
                    .setShipper(shipper)
                    .setAddress(address)
                    .setDistrict(district)
                    .setCity(city)
                    .setNote(note)
                    .setCancel({check: false})
                    .setReceive({check: false})
                    .buildInfo()
                    // Original
                    // const query = new Buy ({
                    //     user,
                    //     validation,
                    //     check,
                    //     name,
                    //     totalPrice: newCart.totalPrice,
                    //     products: newCart.products,
                    //     phone,
                    //     email,
                    //     orderDate,
                    //     deliveryDate: orderDate.addDays(3),
                    //     shipper,
                    //     address,
                    //     district,
                    //     city,
                    //     note
                    // })
                    var newBuy = await query.save()
                    if (newBuy !== null) {
                        var newCart = await Cart.findByIdAndUpdate(cart,{totalPrice: 0, products: []},{new: true, useFindAndModify: false})
                        if (newCart !== null || newCart !== undefined) {
                            res.status(200).json({
                                status: true,
                                message: 'Thanh toán sản phẩm thành công',
                                Buy: newBuy
                            })
                        }
                        else {
                            throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
                        }
                    }
                    else {
                        throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
                    }
                }
                else {
                    throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
                }
            }
            else {
                throw new Error(`Xác thực mật khẩu sai, vui lòng thử lại`)
            }
        } catch (error) {
            res.status(500).json({
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

async function updateCancelBuyById(req, res, next) {
    const {id} = req.body
    if (!id) {
        return res.status(500).json({
            status: false,
            error: 'Lỗi xảy ra, vui lòng refresh lại trang'
        })
    }
    try {
        let query = {
            cancel : {
                check: true,
                date: new Date()
            }
        }
        const newBuy = await Buy.findByIdAndUpdate(id, query, {new: true, useFindAndModify: false})
        if (newBuy !== null || newBuy !== undefined) {
            res.status(200).json({
                status: true,
                message: 'Huỷ đơn hàng thành công',
                Buy: newBuy
            })
        }
        else {
            throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

async function updateValidationBuyById(req, res, next) {
    const {id} = req.body
    if (!id) {
        return res.status(500).json({
            status: false,
            error: 'Lỗi xảy ra, vui lòng refresh lại trang'
        })
    }
    try {
        let query = {
            validation: true
        }
        const newBuy = await Buy.findByIdAndUpdate(id, query, {new: true, useFindAndModify: false})
        if (newBuy !== null || newBuy !== undefined) {
            res.status(200).json({
                status: true,
                message: 'Xác thực đơn hàng thành công',
                Buy: newBuy
            })
        }
        else {
            throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

async function updateReceiveBuyById(req, res, next) {
    const {id} = req.body
    if (!id) {
        return res.status(500).json({
            status: false,
            error: 'Lỗi xảy ra, vui lòng refresh lại trang'
        })
    }
    try {
        let query = {
            receive: {
                check: true,
                date: new Date()
            }
        }
        const newBuy = await Buy.findByIdAndUpdate(id, query, {new: true, useFindAndModify: false})
        if (newBuy !== null || newBuy !== undefined) {
            res.status(200).json({
                status: true,
                message: 'Đã nhận hàng!!!',
                Buy: newBuy
            })
        }
        else {
            throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

async function gerBuyById(req, res, next) {
    try {
        const {id} = req.params

        const buy = await Buy.findById(id).populate({
            path: 'products.voucher',
            populate: {
                path: 'brand category'
            }
        }).populate('shipper.item')
        if (buy !== null || buy !== undefined) {
            res.status(200).json({
                status: true,
                message: 'Xuất hoá đơn thành công',
                Buy: buy
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

module.exports = {addBuyAndDeleteCart, getAllBuy, addBuy, updateCancelBuyById, updateValidationBuyById, updateReceiveBuyById, gerBuyById}