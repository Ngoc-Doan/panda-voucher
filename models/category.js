const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

CategorySchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('categories', CategorySchema)