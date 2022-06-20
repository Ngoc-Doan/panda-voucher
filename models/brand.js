const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
})

BrandSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('brands', BrandSchema)