const compose = require('koa-compose');
const passport = require('koa-passport');

const User = require('./../../models/User');
const getProvider = require('./oauth');
const {NotAuthorized} = require("../errors");

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

async function oauth(ctx, next) {
  const provider = getProvider(ctx.params.provider);
  await provider(ctx, next);
}

async function oauthCallback(ctx, next) {
  const provider = getProvider(ctx.params.provider);
  await provider(ctx, next);
}

module.exports = {
  login: compose([
    passport.authenticate('local', {successRedirect: '/home'}),
  ]),
  home: (ctx, next) => {
    if (!ctx.isAuthenticated()) {
      throw new NotAuthorized()
    }

    ctx.body = ctx.state.user;
  },
  register,
  logout,
  oauth,
  oauthCallback,
};
