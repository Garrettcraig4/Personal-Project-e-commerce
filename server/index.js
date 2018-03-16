require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const massive = require("massive");
const test = require("../server/controllers/test");
const Auth0Strategy = require("passport-auth0");
const path = require("path");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(`${__dirname}/../build`));

const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET,
  PAYMENT_SERVER_URL,
  STRIPE_PLUBLISHABLE,
  sk_test_MT_SECRET_KEY,
  SENDMAIL,
  SENDPASS
} = process.env;

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db); //k
});
app.use(json());
app.use(cors());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000
    }
  })
);
//---------- node mailer --------------

var transporter = nodemailer.createTransport(
  `smtps://${SENDMAIL}:${SENDPASS}@smtp.gmail.com`
);

// setup e-mail data with unicode symbols

//---------- node mailer --------------
//----------------------auth0-------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile email",
      callbackURL: "/Auth"
    },
    (accessToken, resfreshToken, extraParams, profile, done) => {
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthId([
                profile.id,
                profile._json.name,
                profile._json.email
              ])
              .then(created => done(null, created[0]));
          } else {
            return done(null, response[0]);
          }
        })
        .catch(console.log);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/Auth",
  passport.authenticate("auth0", {
    successRedirect: "/Store",
    failureRedirect: "/Auth"
  })
  // (req, res) => {
  //   res.redirect(`http://localhost:3000/UserInfo/${req.user.username}`);
  // } // create endpoint
);
//----------------auth0----------------
app.get("/api/Products", (req, res) => {
  req.app
    .get("db")
    .getProductList([req.products])
    .then(response => {
      res.status(200).json(response);
    });
});

app.get("/api/Cart", (req, res) => {
  req.app
    .get("db")
    .getUserCart([req.user.id])
    .then(response => {
      let resanduser = { response, requ: req.user };
      res.status(200).json(resanduser);
    });
});

app.get("/api/GetUserOrder", (req, res) => {
  req.app
    .get("db")
    .getUserOrder([req.user.id])
    .then(response => {
      console.log(response, "00000000000000");
      res.status(200).json(response);
    });
});

app.get("/api/getUser", (req, res, next) => {
  console.log("get user heres req.user", req.user);

  res.status(200).json(req.user);
});

app.get("/api/GetTotal", (req, res) => {
  req.app
    .get("db")
    .getTotalFromUserCart([req.user.id])
    .then(response => {
      res.status(200).json(response);
    });
});

app.post(`/api/addtocart`, (req, res) => {
  req.app
    .get("db")
    .addProductToUserCart([req.user.id, req.body.product.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log("dsafsdf", err));
});

app.post(`/api/deletefromcart`, (req, res) => {
  req.app
    .get("db")
    .deleteProductFromUserCart([req.user.id, req.body.product.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log("dsafsdf", err));
});

// app.post(`/api/adduseraddressinfo`, (req, res) => {
//   console.log(req.body, "this is the req.body on userinfoadd", req.user);
//   req.app
//     .get("db")
//     .addUserAddress([
//       req.body.tempcity,
//       req.body.tempaddress,
//       req.body.tempstate,
//       req.body.tempzip,
//       req.body.tempcountry
//       // app.get("db").addUserOrder()
//       //order id
//     ])
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(console.log);
// });

//--------------------stripe------------

const configureStripe = require("stripe");

const stripe = configureStripe(sk_test_MT_SECRET_KEY);

const postStripeCharge = (res, req) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });

    app
      .get("db")
      .addUserOrder([
        req.body.amount,
        stripeRes.source.address_city,
        stripeRes.source.address_line1,
        stripeRes.source.address_state,
        stripeRes.source.address_zip,
        stripeRes.source.address_country
      ])
      .then(response => {
        console.log(response[0].id, "thisisisisiisisii is id");
        app.get("db").finishOrder([response[0].id, req.user.id]);

        // res.status(200).json(response);
        //${req.user.name}
        //Total of Order :${req.body.amount}
        //shipping address: ${stripeRes.address_line1} State: ${
        //stripeRes.source.address_state
        //} City: ${stripeRes.source.address_city}
        // <h1>Card Used</h1>//
        //<p>brand: ${stripeRes.source.brand},Last four on card: ${
        //stripeRes.source.last4
        //}, exp mouth and year ${stripeRes.source.exp_month} / ${
        //stripeRes.source.exp_year
        //}
        //

        var mailOptions = {
          from: `"Garretts Online Rolex Dealer" <${SENDMAIL}>`, // sender address
          to: `${req.user.email}`, // list of receivers
          subject: "Your Rolex Order Is Confermed", // Subject line
          text: "Confermed", // plaintext body
          html: `<b>
          <p style="text-align: center;"><span style="font-size: 26pt;">&nbsp;Hello ${
            req.user.name
          }&nbsp;</span></p>
          <p style="text-align: center;">&nbsp;</p>
          <p style="text-align: center;"><span style="font-size: 20pt;"><strong><em>Your Rolex Order Has been&nbsp;confirmed!</em></strong></span></p>
          <p style="text-align: left;">&nbsp;</p>
          <p style="text-align: left;">&nbsp;</p>
          <p style="text-align: left;"><span style="font-size: 11pt;"><strong><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Your Shiping Info :</em></strong></span></p>
          <p style="text-align: center;"><span style="font-size: 11pt;"><strong><em>shipping address: ${
            stripeRes.source.address_line1
          }</em></strong></span></p>
          <p style="text-align: center;"><span style="font-size: 11pt;"><strong><em>state:  ${
            stripeRes.source.address_state
          }</em></strong></span></p>
          <p style="text-align: center;"><span style="font-size: 11pt;"><strong><em>city: ${
            stripeRes.source.address_city
          }</em></strong></span></p>
          <p style="text-align: center;">&nbsp;</p>
          <p style="text-align: center;">&nbsp;</p>
          <p style="text-align: center;">&nbsp;</p>
          <p style="text-align: left;"><span style="font-size: 11pt;"><strong><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Card Used:</em></strong></span></p>
          <p style="text-align: center;"><span style="font-size: 11pt;"><strong><em>brand: ${
            stripeRes.source.brand
          }</em></strong></span></p>
          <p style="text-align: center;"><span style="font-size: 11pt;"><strong><em>Last four on card: ${
            stripeRes.source.last4
          }</em></strong></span></p>
          <p style="text-align: center;"><span style="font-size: 11pt;"><strong><em>exp :&nbsp; ${
            stripeRes.source.exp_month
          } / ${stripeRes.source.exp_year}</em></strong></span></p>
          <p style="text-align: center;">&nbsp;</p>
          <p style="text-align: right;"><span style="font-size: 11pt;"><strong><em>Total:$${
            req.body.amount
          }</em></strong></span></p>
          <p style="text-align: left;">&nbsp;</p>
  <p>* you will not get charged or receive product  </p>
          /b>` // html body
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: " + info.response);
        });
      })
      .catch(err => console.log("this errrr", err));
  }
};
app.post("/api/Pay", (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res, req));
});
// const paymentApi = app => {
//   app.get("/api/Pay", (req, res) => {
//     res.send({
//       message: "Hello Stripe checkout server!",
//       timestamp: new Date().toISOString()
//     });
//   });

//-------------------stripe---------------
//thisss isss the looogoiut

// app.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("http://localhost:3002/");
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`server is listening on port  ${port}`);
});
