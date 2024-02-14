const {getUser} = require('../services/auth');

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies.token;
    if (!tokenCookie) {
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    next();

}

function restrictTo(roles=[]){
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login');
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ error: 'Unauthorized'});
        }
        next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
}