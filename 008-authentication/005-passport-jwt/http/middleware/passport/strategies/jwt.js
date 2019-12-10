const config = require('config');
const {Strategy, ExtractJwt} = require('passport-jwt');

const User = require('./../../../../models/User');
const {AccessDenied} = require("../../../errors");

module.exports = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('auth.jwt.secret'),
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(new AccessDenied())
    }
    done(null, {user})
  } catch (e) {
    done(e)
  }
});
