const passport = require('koa-passport');
module.exports = passport.authenticate('github', {successRedirect: '/api/home'});
