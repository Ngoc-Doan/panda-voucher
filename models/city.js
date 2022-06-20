const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const CitySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    brand: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'brands',
            require: true
        }
    ]
})

CitySchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('cities', CitySchema)