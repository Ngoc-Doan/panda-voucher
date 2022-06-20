const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
const {hash, verify} = require('../config/crypto')

var LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true,
}

async function _onCallbackData(req, username, password, done) {
    try {
        let passwordHash = await hash(password)
        if(username.trim()==="" || password.trim()===""){
            return done(null, false,{ message: "Username hoặc password không được để trống" });
        }
        let user = await User.findOne({ username: username, password: passwordHash })
        if (!user || user.type === "customer")
            return done(null, false,{ message: "Username hoặc password sai, vui lòng nhập lại" });
        return done(null, user);
    } catch (err) {
        console.error(err)
    }
}

async function _onCallbackDataAdmin(req, username, password, done) {
    try {
        let passwordHash = await hash(password)
        if(username.trim()==="" || password.trim()===""){
            return done(null, false,{ message: "Username hoặc password không được để trống" });
        }
        let user = await User.findOne({ username: username, password: passwordHash })
        if (!user || user.type != "Admin")
            return done(null, false,{ message: "Username hoặc password sai, vui lòng nhập lại" });
        return done(null, user);
    } catch (err) {
        console.error(err)
    }
}

module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onCallbackData));

    passport.use('local-login-admin', new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onCallbackDataAdmin));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}