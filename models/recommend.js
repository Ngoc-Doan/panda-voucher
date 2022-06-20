const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const RecommendSchema = mongoose.Schema({
    voucher: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
            require: true
        }
    ]
})

RecommendSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('recommends', RecommendSchema)