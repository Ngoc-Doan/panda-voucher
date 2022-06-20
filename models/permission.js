const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const PermissionSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    num: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('permissions', PermissionSchema)