const Cart = require('../models/cart')
const Voucher = require('../models/voucher')
const User = require('../models/user')

const CartBuilder = require('../pattern/CartBuilder')

const { validationResult } = require('express-validator')

async function getAllCart(req, res, next) {
    Cart.find()
        .populate('products.voucher').exec()
        .then(carts => {
            res.status(200).json({
                status: true,
                message: 'Tất cả cart',
                Carts: carts
            })
        }).catch(e => {
            res.status(500).json({
                status: false,
                error: e.message
            })
        })
}

async function getCartById(req, res, next) {
    const { id } = req.params
    Cart.findById(id).populate('products.voucher').exec()
        .then(cart => {
            res.status(200).json({
                status: true,
                message: 'Get cart thành công',
                Carts: cart
            })
        }).catch(e => {
            res.status(500).json({
                status: false,
                error: e.message
            })
        })
}

async function addCart(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        // user vs voucher là id, amount là số lượng vouchers thêm vào giỏ hàng
        const { user, voucher, amount } = req.body
            // tìm kiếm theo id_user
        Cart.findOne({ user: user }).populate("products.voucher").then(selectCart => {
            if (selectCart) {
                // cart.populate("products.voucher").aggregate([
                //     {
                //         "$addFields": {
                //             "totalPrice": {
                //                 "$sum": "$products.amount*$products.voucher.price"
                //             }
                //         }
                //     },
                // ])
                Voucher.findById(voucher)
                    .then(v => {
                        selectCart.totalPrice += v.price * amount
                        let check_available = false
                        selectCart.products.forEach(async item => {
                            // nếu sản phẩm có trong giỏ hàng, cập nhật số lượng sản phẩm
                            if (item.voucher._id == voucher) {
                                console.log('------------------------')
                                console.log("check sản phẩm có trong giỏ hàng")
                                item.amount += amount
                                check_available = true
                                    // xoá sản phẩm cũ
                                await Cart.findOneAndUpdate({ user: user }, {
                                        $pull: {
                                            products: { voucher: voucher }
                                        }
                                    }, { new: true, useFindAndModify: false })
                                    .then(async(newCartPull) => {
                                        let check_sure = false
                                            // thêm sản phẩm cũ với số lượng mới
                                        newCartPull.products.forEach(element => {
                                            if (element == voucher) {
                                                check_sure = true
                                            }
                                        });
                                        if (!check_sure) {
                                            return await Cart.findOneAndUpdate({ user: user }, {
                                                totalPrice: selectCart.totalPrice,
                                                $push: {
                                                    products: { voucher: voucher, amount: item.amount }
                                                }
                                            }, { new: true, useFindAndModify: false })
                                        }
                                    })
                                    .then(newCartPush => {
                                        res.status(200).json({
                                            status: true,
                                            message: 'Thêm sản phẩm vào giỏ hàng thành công',
                                            Cart: newCartPush
                                        })
                                    })
                                    .catch(e => {
                                        res.status(500).json({
                                            status: false,
                                            error: e.message
                                        })
                                    })
                            }
                        });
                        // nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào products ------- SUCCESS
                        if (!check_available) {
                            console.log('------------------------')
                            console.log("check sản phẩm không có trong giỏ hàng")
                            Cart.findOneAndUpdate({ user: user }, {
                                    // push vào mảng products => {voucher: voucher, amount: amount}
                                    totalPrice: selectCart.totalPrice,
                                    $push: {
                                        products: { voucher: voucher, amount: amount }
                                    }
                                }, { new: true, useFindAndModify: false })
                                .then(newCart => {
                                    res.status(200).json({
                                        status: true,
                                        message: 'Thêm sản phẩm vào giỏ hàng thành công',
                                        Cart: newCart
                                    })
                                })
                                .catch(e => {
                                    res.status(500).json({
                                        status: false,
                                        error: e.message
                                    })
                                })
                        }
                    }).catch(e => {
                        res.status(500).json({
                            status: false,
                            error: e.message
                        })
                    })
            } else {
                // Original
                // let cart = new Cart({
                //     user,
                //     products: {
                //         voucher,
                //         amount
                //     }
                // })
                Voucher.findById(voucher)
                    .then(v => {
                        // Builder Pattern
                        let cart = new CartBuilder()
                            .setUser(user)
                            .setProducts({
                                voucher,
                                amount
                            })
                            .setTotalPrice(v.price * amount)
                            .buildInfo()
                        return cart.save()
                    })
                    .then(newCart => {
                        res.status(200).json({
                            status: true,
                            message: "Thêm sản phẩm vào giỏ hàng thành công",
                            Cart: newCart
                        })
                    }).catch(e => {
                        res.status(500).json({
                            status: false,
                            error: e.message
                        })
                    })
            }
        }).catch(e => {
            res.status(500).json({
                status: false,
                error: e.message
            })
        })
    } else {
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

async function deleteOneCart(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const { user, product } = req.body
            // console.log(product)
        await Cart.findOne({ user: user })
            .populate("products.voucher")
            .then(async data => {
                // console.log(data)
                var products = data.products
                var totalPrice = data.totalPrice
                    // console.log("trước:",totalPrice)
                    // console.log(products)
                products.forEach(p => {
                    // console.log(p._id)
                    if (p._id == product) {
                        totalPrice -= (p.amount * p.voucher.price)
                    }
                })
                if (products.length == 1) {
                    totalPrice = 0
                }
                // console.log("sau:",totalPrice)

                return await Cart.findOneAndUpdate({ user, user }, {
                    totalPrice: totalPrice,
                    $pull: {
                        products: { _id: product }
                    }
                }, { new: true, useFindAndModify: false })

            })
            .then(async newProduct => {
                res.status(200).json({
                    status: true,
                    message: 'Xoá sản phẩm thành công',
                    Cart: newProduct
                })
            })
            .catch(e => {
                res.status(500).json({
                    status: false,
                    error: e.message
                })
            })
    } else {
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

async function updateQuantityItem(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const { user, product, amount } = req.body
        Cart.findOne({ user: user })
            .populate("products.voucher")
            .then(dataCart => {
                dataCart.products.forEach(p => {
                    if (p._id == product) {
                        if (p.amount == 1 & amount < 0) {
                            res.status(500).json({
                                status: false,
                                error: "Số lượng sản phẩm đạt tối thiểu"
                            })
                        } else {
                            Cart.findOneAndUpdate({ user: user, "products._id": product }, {
                                    $inc: { "products.$.amount": amount }
                                }, { new: true, useFindAndModify: false }).populate('products.voucher')
                                .then(async newProduct => {
                                    var totalPrice = newProduct.totalPrice
                                    newProduct.products.forEach(np => {
                                        if (np._id == product) {
                                            if (amount > 0) {
                                                totalPrice += (np.voucher.price)
                                            } else if (amount < 0) {
                                                totalPrice -= (np.voucher.price)
                                            }
                                        }
                                    })
                                    return await Cart.findOneAndUpdate({ user: user }, {
                                        totalPrice: totalPrice
                                    }, { new: true, useFindAndModify: false }).populate('products.voucher').exec()
                                })
                                .then(newP => {
                                    res.status(200).json({
                                        status: true,
                                        message: 'Cập nhật sản phẩm thành công',
                                        Cart: newP
                                    })
                                }).catch(e => {
                                    res.status(500).json({
                                        status: false,
                                        error: e.message
                                    })
                                })
                        }
                    }
                })
            }).catch(e => {
                res.status(500).json({
                    status: false,
                    error: e.message
                })
            })
    } else {
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

async function deleteAllCartOfUser(req, res, next) {
    var { cart } = req.body
    try {
        var newCart = await Cart.findByIdAndUpdate(cart, { totalPrice: 0, products: [] }, { new: true, useFindAndModify: false })
        if (newCart !== null || newCart !== undefined) {
            res.status(200).json({
                status: true,
                message: 'Xoá hết giỏ hàng của user thành công',
                Cart: newCart
            })
        } else {
            throw new Error(`Lỗi xảy ra, vui lòng thử lại`)
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: e.message
        })
    }

}

module.exports = { getAllCart, addCart, deleteOneCart, updateQuantityItem, getCartById, deleteAllCartOfUser }