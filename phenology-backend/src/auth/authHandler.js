const jwt = require("jsonwebtoken");
//const crypto = require("crypto");
const bcrypt = require("bcrypt");
//const bcryptSalt = process.env.BCRYPT_SALT;

// Biztonságosabb megoldás, az adatbázis használata.
// Példa: https://www.npmjs.com/package/mongoose-bcrypt

const User = require("../models/user.model");
let user = new User();

const refreshTokens = [];

module.exports.login = async (req, res) => {
  const email = req.body.email;

  //console.log(email, password);

  user = await User.findOne({ email });
  // console.log(usersFromDatabase)

  /*
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  */

  /*
  bcrypt.compare(req.body.password, user.password, function(err, results){
                if(err){
                    throw new Error(err)
                 }
                 if (results) {
                    return res.status(200).json({ msg: "Login success" })
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }
    */
  /*
    const user = usersFromDatabase.find(
        u => u.email === email && u.password === password
    );
    */

  if (user) {
    console.log(user);

    bcrypt.compare(req.body.password, user.password, function (err, results) {
      if (err) {
        return res.status(401).json({ msg: "Email or password incorrect." });
        //throw new Error(err);
      }
      if (results) {
        const accessToken = jwt.sign(
          {
            email: user.email,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.TOKEN_EXPIRY,
          }
        );

        const refreshToken = jwt.sign(
          {
            email: user.email,
            role: user.role,
          },
          process.env.REFRESH_TOKEN_SECRET
        );
        refreshTokens.push(refreshToken);

        res.json({
          accessToken,
          //refreshToken,
          user,
        });
        //return res.status(200).json({ msg: "Login success" });
      } else {
        console.log("login failure");
        return res.status(401).json({ msg: "Email or password incorrect." });
        //res.send('Email or password incorrect.');
      }
    });
  } else {
    return res
      .status(401)
      .json({ msg: "Ezzel az email címmel nincs regisztrált felhasználó." });
  }
};

module.exports.refresh = (user) => {
  const accessToken = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
  return accessToken;
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

/*
module.exports.refreshOld = (req, res, next) => {
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

    const accessToken = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      }
    );

    res.json({
      accessToken,
    });
  });
};
*/
