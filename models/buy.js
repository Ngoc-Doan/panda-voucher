const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const BuySchema = mongoose.Schema({
    cancel: {
        check: {
            type: Boolean
        },
        date: {
            type: Date
        }
    },
    receive: {
        check: {
            type: Boolean
        },
        date: {
            type: Date
        }
    },
    validation: {
        type: Boolean,
        require: true
    },
    check: {
        type: Boolean,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    orderDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        require: true
    },
    totalPrice:  {
        type: Number,
        default: 0,
        required: true
    },
    products: [
        {
            voucher: {
                type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
                require: true
            },
            amount:  {
                type: Number,
                require: true
            },
        }
    ],
    shipper : {
        item : {
            type: mongoose.Schema.Types.ObjectId, ref: 'shippers',
            require: true
        },
        price: {
            type: Number,
            require: true
        }
    },
    address: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    city: {
        // lấy id bên models city để so sánh vs shipper lấy giá shipper cho từng tỉnh thành khác nhau
        item: {
            type: mongoose.Schema.Types.ObjectId, ref: 'cities',
            require: true
        },
        // Lưu lại thông tin tên của tỉnh
        name: {
            type: String,
            require: true
        }
    },
    note: {
        type: String
    }
})

BuySchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('buys', BuySchema)