const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

const BlogSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        require: true
    },
    parentContent: {
        type: Array,
        require: true
    },
    content: [
        {
            title: {
                type: String,
                require: true
            },
            subContent:  {
                type: Array,
                require: true
            },
            image: {
                type: Array,
            }
        }
    ],
    title: {
        type: String,
        require: true
    },
    createDate: {
        type: Date,
        require: true
    },
    star: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
})

BlogSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('blogs', BlogSchema)