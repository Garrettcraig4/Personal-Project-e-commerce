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

const port = process.env.PORT || 3001;

const app = express();

const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET,
  PAYMENT_SERVER_URL,
  STRIPE_PLUBLISHABLE,
  sk_test_MT_SECRET_KEY
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
  console.log(user);
  done(null, user);
});
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/Auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/Cart",
    failureRedirect: "http://localhost:3000/Auth"
  })
  // (req, res) => {
  //   res.redirect(`http://localhost:3000/UserInfo/${req.user.username}`);
  // } // create endpoint
);
//----------------auth0----------------
app.get("/api/Products", (req, res) => {
  console.log(req, "this is products request");
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
      res.status(200).json(response);
    });
});

app.post(`/api/addtocart`, (req, res) => {
  console.log(req.body.product);
  req.app
    .get("db")
    .addProductToUserCart([req.user.id, req.body.product.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log("dsafsdf", err));
});

app.post(`/api/deletefromcart`, (req, res) => {
  console.log(req.body.product, "req body tas");
  req.app
    .get("db")
    .deleteProductFromUserCart([req.user.id, req.body.product.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log("dsafsdf", err));
});

//--------------------stripe------------

const configureStripe = require("stripe");

const stripe = configureStripe(sk_test_MT_SECRET_KEY);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};
app.post("/api/Pay", (req, res) => {
  console.log("hit the server");
  stripe.charges.create(req.body, postStripeCharge(res));
});
// const paymentApi = app => {
//   app.get("/api/Pay", (req, res) => {
//     res.send({
//       message: "Hello Stripe checkout server!",
//       timestamp: new Date().toISOString()
//     });
//   });

//-------------------stripe---------------

app.listen(port, () => {
  console.log(`server is listening on port  ${port}`);
});
