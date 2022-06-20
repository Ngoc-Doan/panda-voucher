const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');
require('mongoose-double')(mongoose);

const VoucherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    desc: {
        type: Array,
        require: true
    },
    discount: {
        type: mongoose.Schema.Types.Double,
        require: true
    },
    image: {
        type: Array,
        require: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId, ref: 'brands',
        require: true
    },
    Availability: {
        type: Boolean,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categories',
        require: true
    },
    expirationDate: {
        type: Date,
        require: true
    }
})

VoucherSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('vouchers', VoucherSchema)