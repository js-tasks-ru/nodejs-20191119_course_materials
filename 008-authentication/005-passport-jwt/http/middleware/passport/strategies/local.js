const LocalStrategy = require('passport-local');

const User = require('../../../../models/User');
const {AccessDenied} = require("../../../errors");
const issueToken = require('../issueToken');

module.exports = new LocalStrategy({usernameField: 'login'},
  async (login, password, done) => {
    const user = await User.login(login, password);
    if (user) {
      const [accessToken, refreshToken] = await issueToken(user);
      return done(null, {
        user,
        accessToken,
        refreshToken,
      })
    }
    done(new AccessDenied());
  },
);
