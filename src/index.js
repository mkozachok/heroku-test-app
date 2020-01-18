import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport"
const LocalStrategy = require('passport-local').Strategy;
import flash from 'express-flash'
import session from 'express-session'
import "dotenv/config";
import { router } from "./api";
import { setLocalStrategy } from "./auth/passport";
import { userApi } from "./api/user/controller";

const app = express();

setLocalStrategy(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded());

app.use(flash())
app.use(session({
  secret: 'SESSION_SECRET_KEY',
  resave: false,
  saveUninitialized: false
}))


const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/403');
}

app.use(passport.initialize())  
app.use(passport.session())

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

app.use(router);
app.get("/", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "home page"
  });
});

// Auth example
app.post('/login', (req, res, next)  => {
  console.log(req.body)
  passport.authenticate('local', {
    successRedirect:'/profile',
    failureRedirect: '/login',
    failureFlash: false
  })(req, res,  next)
  //res.status(200).send('logged in!');
});

// Auth example
app.post('/register',function (req, res) {
  const {email, password, fullName} = req.body;
  console.log(req.body);
  userApi.create(req.body, () => {
    res.status(200).send('new user!');
  })
});

app.get("/403", (req, res) => {
  return res.status(403).send({
    success: "true",
    message: "you are not authenticated"
  });
});
app.get("/profile", isAuthenticated, (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "profile"
  });
});
app.listen(process.env.PORT || 5000);
