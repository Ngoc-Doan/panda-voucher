const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const FavoriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        require: true
    },
    vouchers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'vouchers',
            require: true
        }
    ]
})

FavoriteSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('favorites', FavoriteSchema)