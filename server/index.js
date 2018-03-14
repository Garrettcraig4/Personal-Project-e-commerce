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
  done(null, user);
});
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/Auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/Store",
    failureRedirect: "http://localhost:3000/Auth"
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

app.listen(port, () => {
  console.log(`server is listening on port  ${port}`);
});
