const jwt = require('jsonwebtoken');
const authHandler = require('./authHandler');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("authHeader:", authHeader);

    if (authHeader) {
        // Bearer lskdfjlkdsjfldsjflsdfj
        const token = authHeader.split(' ')[1];
        console.log("token:", token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log('A felhasználó azonosítása nem sikerült. Kérjük jelentkezzen be újra.')
                return res.status(403).json({ msg: "A felhasználó azonosítása nem sikerült. Kérjük jelentkezzen be újra. "});
            }

            console.log('Az azonosítás sikerült.')
            //req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};