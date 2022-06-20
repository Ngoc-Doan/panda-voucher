const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const ReviewSchema = mongoose.Schema({
    voucher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
        require: true
    },
    name: {
        type: 'String',
        require: true
    },
    email: {
        type: 'String',
        require: true
    },
    review: {
        type: String,
        require: true
    },
    star: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    validation: {
        type: Boolean,
        require: true,
        default: false
    }
})

module.exports = mongoose.model('reviews', ReviewSchema)