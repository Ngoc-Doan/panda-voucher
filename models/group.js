const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'categories',
            require: true
        }
    ]
})

GroupSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('groups', GroupSchema)