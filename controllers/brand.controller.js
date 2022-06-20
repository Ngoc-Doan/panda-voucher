const Brand = require('../models/brand')
const City = require('../models/city')

const {validationResult} = require('express-validator')

const BrandBuilder = require('../pattern/BrandBuilder')

async function addBrandAndUpdateIntoCity(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const {name, address, phone, city} = req.body
        const brands = new BrandBuilder()
        .setName(name)
        .setAddress(address)
        .setPhone(phone)
        .buildInfo()

        try {
            const newBrand = await brands.save()

            if (newBrand == null || newBrand == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
            const newCity = await City.findByIdAndUpdate(city, {
                $inc: {amount : 1},
                $push: {
                    brand: newBrand._id
                }
            }, {new: true, useFindAndModify: false})
            if (newCity == null || newCity == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
            return res.status(200).json({
                status: true,
                message: 'Thêm thương hiệu thành công',
                Brand: newBrand
            })
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


module.exports = {addBrandAndUpdateIntoCity}