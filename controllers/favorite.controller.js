const Favorite = require('../models/favorite')

async function addFavorite(req, res, next) {
    try {
        const {user, voucher} = req.body

        if (user == "" || user == undefined || user == null) {
            throw new Error('Vui lòng đăng nhập')
        }
    
        if (voucher == "" || voucher == undefined || voucher == null) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }
    
        let favorite = await Favorite.findOne({user: user})
        if (!favorite && favorite == null && favorite == undefined) {
            let vouchers = []
            vouchers.push(voucher)
            let query = Favorite({
                user,
                vouchers
            })
            
            let newFavorite = await query.save()

            if (!newFavorite && newFavorite == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }

            return res.status(200).json({
                status: true,
                message: 'Thêm sản phẩm vào mục ưu thích thành công',
                Voucher: newFavorite
            })
        }
        else {
            let newFavorite = await Favorite.findOneAndUpdate({user: user}, {
                $addToSet: {
                    vouchers: voucher
                }
            }, {new: true, useFindAndModify: false})

            if (!newFavorite && newFavorite == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }

            return res.status(200).json({
                status: true,
                message: 'Thêm sản phẩm vào mục ưu thích thành công',
                Voucher: newFavorite
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

async function deleteFavoriteByUserId(req, res, next) {
    const {user, voucher} = req.params

    try {
        if (user == null || user == '' || user == undefined) {
            throw new Error('Vui lòng đăng nhập')
        }
        const newFavorite = await Favorite.findOneAndUpdate({user: user}, {
            $pull: {
                vouchers: voucher
            }
        } , {new: true, useFindAndModify: false})

        if (newFavorite == null || newFavorite == undefined) {
            throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
        }
        return res.status(200).json({
            status: true,
            message: 'Xoá sản phẩm ưu thích thành công',
            Favorite: newFavorite
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

module.exports = {addFavorite, deleteFavoriteByUserId}