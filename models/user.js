const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	district: {
		type: String
	},
	city: {
		type: String
	},
	url: {
		type: String
	},
	street: {
		type: String
	},
	desc: {
		type: String
	},
	phone: {
		type: String
	},
	code: {
		type: Number
	},
	permission: [
		{
            type: mongoose.Schema.Types.ObjectId, ref: 'permissions',
        }
	],
	image: {
		type: String,
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	type: {
		type: String,
		required: true,
	},
	salary: {
		type: Number
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
        required: true,
	}
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', UserSchema)