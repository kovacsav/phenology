const res = require("express/lib/response");
const User = require("../../models/user.model");
const Token = require("../../models/token.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const bcryptSalt = process.env.BCRYPT_SALT;
const frontendURL = process.env.FRONTEND_PORT;

exports.create = (data) => {
  const user = new User(data);
  let token = new Token();
  token.userId = user._id;
  token.token = jwt.sign({ id: user._id }, process.env.SECRET);
  return user.save(), token.save();
};

exports.findAll = () => User.find().populate();

exports.findOne = (id) => User.findById(id).populate();

exports.findOneParam = (param) => User.findOne(param);

exports.update = (id, updateData) =>
  User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => User.findByIdAndRemove(id);

exports.findOneByConfirmationcode = (confirmationCode) => {
  console.log("find one start");
  User.findOne({ confirmationCode: confirmationCode })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.active = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
      return res.status(201);
    })
    .catch((e) => console.log("error", e));
};

// registration confrimation email
// https://betterprogramming.pub/how-to-create-a-signup-confirmation-email-with-node-js-c2fea602872a

/*
const confirmationCode = jwt.sign(
  { email: req.body.email },
  process.env.SECRET
);
*/

const adminEmailUser = process.env.ADMIN_EMAIL;
const adminUserPass = process.env.ADMIN_EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
  //service: "Gmail",

  host: "zcs.met.hu",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: adminEmailUser,
    pass: adminUserPass,
  },
});

// verify connection configuration
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports.sendRegistrationConfirmationEmail = (
  name,
  email,
  confirmationCode
) => {
  //console.log("Check");
  transport
    .sendMail({
      from: "admin", //adminEmailUser,
      to: email,
      subject: "Regisztráció megerősítés - növényfenológia",
      html: `<h1>Regisztráció megerősítés</h1>
        <br>    
        <h2>Kedves ${name} !</h2>
        <br>
        <p>Köszönettel vettük regisztrációját az Országos 
        Meteorológiai Szolgálat Növényfenológiai oldalán.
        A regisztráció véglegesítéséhez már csak egy lépés van hátra:
        ehhez kérjük kattintson az alábbi linkre: </p>
        <a href=${frontendURL}/confirm/${confirmationCode}> Regisztráció megerősítése</a>
        <br>
        <p>Kéréseivel, javaslataival kérjük bizalommal
        forduljon hozzánk elérhetőségeinken, kollégáink
        mindenben állnak rendelkezésre!</p>
        <br>
        <p>Bízunk benne, hogy az Ön közreműködésével még pontosabban
        tudjuk környezetünk állapotát a megfigyelések segítségével 
        meghatározni, leírni és megőrizni utódaink számára.</p>
        <br>
        <p>Országos Meteorológiai Szolgálat</p>
        <br>
        <p>Ez egy automatikus levél, kérjük ne válaszoljon rá.</p>
        <br>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendNewPasswordEmail = (name, email, link) => {
  //console.log("Check");
  transport
    .sendMail({
      from: "admin", //adminEmailUser,
      to: email,
      subject: "Új jelszó igénylése - növényfenológia",
      html: `<h1>Új jelszó igénylése a Növényfenológiai oldalra 
      való bejelentkezéshez</h1>
        <br>    
        <h2>Kedves ${name} !</h2>
        <br>
        <p>Az új jelszó beállításához kérjük kattintson az alábbi 
        linkre: </p>
        <a href=${link}>Új jelszó igénylése</a>
        <br>
        <p>Kéréseivel, javaslataival kérjük bizalommal
        forduljon hozzánk elérhetőségeinken, kollégáink
        mindenben állnak rendelkezésre!</p>
        <br>
        <p>Köszönjük, hogy Ön is részt vesz a növényfenológiai 
        megfigyelések végézésében!
        </p>
        <br>
        <p>Bízunk benne, hogy az Ön közreműködésével még pontosabban
        tudjuk környezetünk állapotát a megfigyelések segítségével 
        meghatározni, leírni és megőrizni utódaink számára.</p>
        <br>
        <p>Országos Meteorológiai Szolgálat</p>
        <br>
        <p>Ez egy automatikus levél, kérjük ne válaszoljon rá.</p>
        <br>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${frontendURL}/passwordReset/${resetToken}/${user._id}`;

  currentService.sendNewPasswordEmail(user.lastName, user.email, link)
  return;
};


module.exports.resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  
  await passwordResetToken.deleteOne();
  return true;
};