const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");
//const user = require("../models/user.model");
const nodemailer = require("nodemailer");

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
const frontendURL = process.env.FRONTEND_PORT;

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

module.exports.sendEmail = (name, email, confirmationCode) => {
  //console.log("Check");
  transport
    .sendMail({
      from: "admin",//adminEmailUser,
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
        <a href=http://localhost:${frontendURL}/confirm/${confirmationCode}> Regisztráció megerősítése</a>
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
