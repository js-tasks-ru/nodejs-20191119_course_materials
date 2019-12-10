const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const User = require('./../../models/User');

class AccessDenied extends Error {
  constructor() {
    super('Access Denied');
    this.status = 403;
    this.expose = false;
  }
}

const local = new LocalStrategy(

  {usernameField: 'login'},

  async (login, password, done) => {
    const user = await User.login(login, password);
    if (user) {
      return done(null, user)
    }
    done(new AccessDenied());
  },
);

passport.use(local);

module.exports = passport;
