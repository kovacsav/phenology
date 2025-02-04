const jwt = require('jsonwebtoken');

// Biztonságosabb megoldás, az adatbázis használata.
// Példa: https://www.npmjs.com/package/mongoose-bcrypt

// const Users = [
//     {
//         username: 'admin',
//         password: 'admin_pw',
//         role: 'admin'
//     },
//     {
//         username: 'user',
//         password: 'user_pw',
//         role: 'user'
//     }
// ];


const users = require('../models/user.model')

const refreshTokens = [];

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    const usersFromDatabase = await users.find({});
    // console.log(usersFromDatabase)

    const user = usersFromDatabase.find(
        u => u.email === email && u.password === password
    );
    if (user) {
        const accessToken = jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            user
        });
    } else {
        res.send('Email or password incorrect.');
    }
};

module.exports.refresh = (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        console.log(refreshTokens, token);
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({
            accessToken
        });
    });
};

module.exports.logout = (req, res) => {
    const { token } = req.body;

    if (!refreshTokens.includes(token)) {
        res.sendStatus(403);
    }

    const tokenIndex = refreshTokens.indexOf(token);
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
};