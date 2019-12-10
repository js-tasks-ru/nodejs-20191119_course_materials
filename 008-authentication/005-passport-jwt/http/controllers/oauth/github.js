const passport = require('koa-passport');
module.exports = passport.authenticate('github', {session:false});
