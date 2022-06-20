const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');
const CartSchema = mongoose.Schema({
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
})

CartSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('carts', CartSchema)