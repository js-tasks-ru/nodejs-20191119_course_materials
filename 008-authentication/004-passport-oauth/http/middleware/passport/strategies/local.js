const User = require('../../../../models/User');
const LocalStrategy = require('passport-local');
const {AccessDenied} = require("../../../errors");

module.exports = new LocalStrategy({usernameField: 'login'},
  async (login, password, done) => {
    const user = await User.login(login, password);
    if (user) {
      return done(null, user)
    }
    done(new AccessDenied());
  },
);
