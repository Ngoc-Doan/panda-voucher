const User = require('../models/user')
const Buy = require('../models/buy')
const Cart = require('../models/cart')

const {validationResult} = require('express-validator')

const {hash, verify} = require('../config/crypto')

const fetch = require("node-fetch");

var mongoose = require('mongoose');

const cloudinary = require('cloudinary').v2

// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

async function updateUserId(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        try {
            const id = req.params.id
            const {name, email, phone, url, street, city, district, code, desc, password} = req.body
            const user = {
                name,
                email,
                city,
                district,
                code,
                phone,
                street,
                url,
                desc
            }
            let passHashed = await hash(password)
            const check = await User.find({email: email})
            if (check.length >= 1) {
                throw new Error('Email đã tồn tại hoặc bạn chưa đổi email')
            }
    
            const newUser = await User.findOneAndUpdate({_id: id, password : passHashed}, user, {new: true, useFindAndModify: false})
            if (newUser == null || newUser == undefined) {
                throw new Error(`Xác thực mật khẩu sai`)
            }
            res.status(200).json({
                status:true,
                message:`Cập nhật người dùng thành công`,
                user: newUser
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

async function updateUserStaffById(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        try {
            const id = req.params.id
            const {mainUser, name, email, phone, url, street, city, district, code, desc, salary, password} = req.body
            const user = {
                salary,
                name,
                email,
                city,
                district,
                code,
                phone,
                street,
                url,
                desc
            }
            let passHashed = await hash(password)
            const check = await User.find({email: email})
            if (check.length >= 1) {
                throw new Error('Email đã tồn tại hoặc bạn chưa đổi email')
            }

            const checkPass = await User.findOne({_id: mainUser, password: passHashed})
            if (checkPass == undefined || checkPass == null) {
                throw new Error('Xác thực mật khẩu sai, vui lòng thử lại')
            }
    
            const newUser = await User.findOneAndUpdate({_id: id}, user, {new: true, useFindAndModify: false})
            if (newUser == null || newUser == undefined) {
                throw new Error(`Lỗi xảy ra, vui lòng refresh lại trang`)
            }
            res.status(200).json({
                status:true,
                message:`Cập nhật thông tin nhân viên thành công`,
                user: newUser
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

async function updatePermissionById(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        try {
            const {permission, password, user} = req.body
            const {id} = req.params
            if (!id) {
                throw new Error('Vui lòng chọn nhân viên')
            }
            let permissionType = []
            permission.forEach(p => {
                permissionType.push(mongoose.Types.ObjectId(p))
            })

            let passHashed = await hash(password)

            const check = await User.findOne({_id: user, password: passHashed})
            if (!check || check == undefined || check == null) {
                throw new Error('Xác thực mật khẩu sai, vui lòng thử lại')
            }

            const newUser = await User.findByIdAndUpdate(id, {permission: permissionType}, {new: true, useFindAndModify: false})
            if (newUser == undefined || newUser == null) {
                throw new Error('Xác thực mật khẩu sai, vui lòng thử lại')
            }
            return res.status(200).json({
                status: true,
                message: 'Thêm quyền cho nhân viên thành công',
                User: newUser
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

async function updatePasswordById(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        const {id} = req.params
        const {old_password, new_password} = req.body
        try {
            let passOldHashed = await hash(old_password)
            let passNewHashed = await hash(new_password)
            const newUser = await User.findOneAndUpdate({_id: id, password: passOldHashed}, {password: passNewHashed}, {new: true, useFindAndModify:false})
            if (newUser == null || newUser == undefined) {
                throw new Error('Sai mật khẩu cũ, vui lòng thử lại')
            }

            return res.status(200).json({
                status: true,
                message: 'Cập nhật mật khẩu mới thành công'
            })
        } catch (error) {
            res.status(500).json({
                status:false,
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

async function addStaffUser(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        try {
            let token = req.cookies.token
            let connectId = req.cookies['connect.sid']
            const {id, name, email, username, phone, password, salary, re_password, valid_password, image} = req.body
            
            let passHashed = await hash(password)
            const query = new User({
                name,
                email,
                username,
                phone,
                salary,
                password: passHashed,
                type: 'Admin'
            })
            
            let passMainUserHashed = await hash(valid_password)
    
            const check = await User.findOne({_id: id, password: passMainUserHashed})
            if (!check) {
                throw new Error('Xác thực mật khẩu sai, vui lòng thử lại')
            }
    
            const checkEmail = await User.find({email: email})
            if (checkEmail.length >= 1) {
                throw new Error('Email đã tồn tại, vui lòng nhập email mới')
            }

            let queryImg = {
                image: image,
                image_name: query._id,
                folder: `users/${query._id}`
            }
        
            const url = await fetch(`${process.env.URL}/api/image-upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `connect.sid=${connectId};token=${token}`
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
            query.image = url
    
            const newStaff = await query.save()
            if (newStaff == null || newStaff == undefined) {
                throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
            }
    
            return res.status(200).json({
                status: true,
                message: 'Thêm nhân viên mới thành công',
                Staff: newStaff
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

async function updateAvatarUserById(req, res, next) {
    const {id} = req.params
    const {image} = req.body
    try {
        let token = req.cookies.token
        let connectId = req.cookies['connect.sid']
        if (id == null || id == undefined || id == '') {
            throw new Error('Vui lòng đăng nhập')
        }

        if (image == null || image == undefined || image == '') {
            throw new Error('Vui lòng chọn ảnh đại diện')
        }

        let queryImg = {
            image: image,
            image_name: id,
            folder: `users/${id}`
        }
    
        const url = await fetch(`${process.env.URL}/api/image-upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `connect.sid=${connectId};token=${token}`
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

        const newUser = await User.findByIdAndUpdate(id, {image: url}, {new:true, useFindAndModify: false})

        return res.status(200).json({
            status: true,
            message:'Cập nhật ảnh đại diện thành công',
            image: newUser.image
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}

async function deleteUserById(req, res, next) {
    try {
        const {id} = req.params
        if (id == null || id == undefined || id == '') {
            throw new Error('Vui lòng đăng nhập')
        }

        await User.findByIdAndRemove(id, {useFindAndModify: false})
        .exec()
        .then(() => {
            try {
                cloudinary.uploader.destroy(`users/${id}/${id}`)
                cloudinary.api.delete_folder(`users/${id}`)
            } catch (error) {
                throw Error(error.message)
            }
        })

        return res.status(200).json({
            status: true,
            message: 'Xoá nhân viên thành công'
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

async function updateUserCustomerById(req, res, next) {
    let result = validationResult(req)
    if (result.errors.length === 0) {
        try {
            const id = req.params.id
            const {mainUser, name, email, phone, street, city, district, password} = req.body
            const user = {
                name,
                email,
                phone,
                street,
                district,
                city
            }
            let passHashed = await hash(password)
            const check = await User.find({email: email})
            if (check.length >= 2) {
                throw new Error('Email đã tồn tại, vui lòng thử lại')
            }

            const checkPass = await User.findOne({_id: mainUser, password: passHashed})
            if (checkPass == undefined || checkPass == null) {
                throw new Error('Xác thực mật khẩu sai, vui lòng thử lại')
            }
    
            const newUser = await User.findOneAndUpdate({_id: id}, user, {new: true, useFindAndModify: false})
            if (newUser == null || newUser == undefined) {
                throw new Error(`Lỗi xảy ra, vui lòng refresh lại trang`)
            }
            return res.status(200).json({
                status:true,
                message:`Cập nhật thông tin khách hàng thành công`,
                user: newUser
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

async function deleteUserCustomerById(req, res, next) {
    try {
        const {id} = req.params
        if (id == null || id == undefined || id == '') {
            throw new Error('Vui lòng đăng nhập')
        }

        await Buy.deleteMany({user: id}).then(async () => {
            try {
                await Cart.deleteMany({user: id}).then(async () => {
                    try {
                        await User.findByIdAndRemove(id, {useFindAndModify: false}).then(() => {
                            try {
                                cloudinary.uploader.destroy(`users/${id}/${id}`)
                                cloudinary.api.delete_folder(`users/${id}`)
                                
                                return res.status(200).json({
                                    status: true,
                                    message: 'Xoá khách hàng thành công'
                                })
                            } catch (error) {
                                throw Error(error.message)
                            }
                        })
                    } catch (error) {
                        throw new Error(error)
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

module.exports = {updateUserId, updatePermissionById, updateUserStaffById, updatePasswordById, addStaffUser, updateAvatarUserById, deleteUserById, updateUserCustomerById, deleteUserCustomerById}