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
  SESSION_SECRET
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
      console.log("profile", profile);
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

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/Auth",
  passport.authenticate("auth0", {
    falureRedirect: "http://localhost:3000/Auth"
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000/UserInfo/${req.user.username}`);
  } // create endpoint
);

app.get("/api/Home", (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else {
    res.status(500).json({ message: "You need to Login to do that!" });
  }
});

//frount end talking
app.get("/api/test", test.test);

//db testing

app.get(`/api/dbtest`, (req, res) => {
  req.app
    .get("db")
    .getUser()
    .then(response => {
      res.status(200).json(response);
    });
});

app.listen(port, () => {
  console.log(`server is listening on port  ${port}`);
});
