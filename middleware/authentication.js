module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/auth')
        }
    },
    ensureGuest: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else if(req.isAuthenticated() && req.user.type == 'Customer') {
            res.redirect('/');
        }
        else if (req.isAuthenticated()) {
            return next();
        }
    },

    ensureAdmin: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else if (req.isAuthenticated() && req.user.type == 'Admin'){
            res.redirect('/admin/dashboard');
        }
        else if (req.isAuthenticated()) {
            return next();
        }
    },
}