const passport = require('koa-passport');
module.exports = passport.authenticate('local', {session: false});
