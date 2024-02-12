
const {v4: uuidv4} = require('uuid');
const User = require('../models/User');
const { setUser } = require('../services/auth');

async function handleUserSignup(req,res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}

async function handleUserLogin(req,res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password});
    if (!user) {
        return res.render("login", {
            error: "Invalid Credentials",

        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};