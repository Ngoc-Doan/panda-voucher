const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const ShipperSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    city: [
        {
            // lấy id bên tỉnh thành
            item : {
                type:  mongoose.Schema.Types.ObjectId, ref: 'cities',
                require: true
            },
            // gán giá ship cho từng tỉnh thành khác nhau
            price: {
                type: Number,
                require: true
            }
        }
    ]
})

ShipperSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('shippers', ShipperSchema)