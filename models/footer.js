const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const FooterSchema = mongoose.Schema({
    voucher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
        require: true
    }
})

FooterSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('footers', FooterSchema)