const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const BannerSchema = mongoose.Schema({
    voucher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
        require: true
    }
})

BannerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('banners', BannerSchema)