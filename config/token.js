const jwt = require('jsonwebtoken')

function authenticateTokenAPI(req, res, next) {
    // Gather the jwt access token from the request header
  const authHeader = req.cookies.token
    const token = authHeader
    if (token == null) return res.status(401).json({message:"Missing token"}); // if there isn't any token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user) => {
      if (err) return res.status(203).json({message:"Non-Authoritative Information"});
      next() // pass the execution off to whatever request the client intended
    })
}

function authenticateToken(req, res, next) {
    if (req.user && req.user.type == 'Customer') {
        // Gather the jwt access token from the request header
        const authHeader = req.cookies.token
        const token = authHeader
        if (token == null) return res.redirect('/login') // if there isn't any token
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user) => {
        if (err) return res.redirect('/login/logout')
        next() // pass the execution off to whatever request the client intended
        })
    }else {
        res.redirect('/login/logout')
    }

}

function authenticateTokenAdmin(req, res, next) {
    if (req.user && req.user.type == 'Admin') {
        // Gather the jwt access token from the request header
        const authHeader = req.cookies.tokenAdmin
        const token = authHeader
        if (token == null) return res.redirect('/22012000/login') // if there isn't any token
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user) => {
        if (err) return res.redirect('/22012000/login/logout')
        next() // pass the execution off to whatever request the client intended
        })
    } else {
        res.redirect('/22012000/login/logout')
    }
}

function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    try {
        return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3000s' });
    } catch (error) {
        console.log(error)
    }
     
}

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;
  
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  
    return list;
}

module.exports = {authenticateTokenAPI, authenticateToken, generateAccessToken, parseCookies, authenticateTokenAdmin}