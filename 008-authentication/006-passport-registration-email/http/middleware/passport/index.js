const passport = require('koa-passport');
const {local, github, jwt} = require("./strategies");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user)
});

passport.use(local);
passport.use(github);
passport.use(jwt);

module.exports = passport;
