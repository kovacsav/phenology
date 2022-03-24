const jwt = require('jsonwebtoken');
const authHandler = require('./authHandler');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Bearer lskdfjlkdsjfldsjflsdfj
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log('A felhasználó azonosítása nem sikerült. Kérjük jelentkezzen be újra.')
                return res.status(403).json({ msg: "A felhasználó azonosítása nem sikerült. Kérjük jelentkezzen be újra. "});
            }

            req.user = user;
            authHandler.refresh();
            next();
        });
    } else {
        res.sendStatus(401);
    }
};