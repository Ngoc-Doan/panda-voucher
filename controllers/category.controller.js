const Category = require('../models/category')
const Group = require('../models/group')

const {validationResult} = require('express-validator')

async function addCategoryAndUpdateIntoGroup(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const {name, group} = req.body
        const category = new Category({
            name
        })
        try {
            const newCategory = await category.save()
            if (newCategory == null || newCategory == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
            const newGroup = await Group.findByIdAndUpdate(group, {
                $push: {
                    category: newCategory._id
                }
            }, {new: true, useFindAndModify: false})

            if (newGroup == null || newGroup == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }

            return res.status(200).json({
                status: true,
                message: 'Thêm phân loại thành công',
                Category: newCategory
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

module.exports = {addCategoryAndUpdateIntoGroup}