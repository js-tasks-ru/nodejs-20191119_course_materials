const compose = require('koa-compose');
const passport = require('koa-passport');

const User = require('./../../models/User');

class NotAuthorized extends Error {
  constructor() {
    super();
    this.status = 401;
  }
}

async function register(ctx, next) {
  const {login, password} = ctx.request.body;
  const user = new User({login, password,});

  await user.save();
  ctx.status = 201;
}

function logout(ctx, next) {
  ctx.logout();
  ctx.status = 200;
}

module.exports = {
  login: passport.authenticate('local', {successRedirect: '/home'}),
  home: (ctx, next) => {
    if (!ctx.isAuthenticated()) {
      throw new NotAuthorized()
    }

    ctx.body = ctx.state.user;
  },
  register,
  logout,
};
