const passport = require('koa-passport');
const {local, github} = require("./strategies");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user)
});

passport.use(local);
passport.use(github);

module.exports = passport;
