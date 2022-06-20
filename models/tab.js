const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const TabSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categories',
        require: true
    },
    voucher: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
            require: true
        }
    ]
})

TabSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('tabs', TabSchema)