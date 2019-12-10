const compose = require('koa-compose');
const passport = require('koa-passport');

const User = require('./../../models/User');

async function register(ctx, next) {
  const {login, password} = ctx.request.body;
  const user = new User({login, password,});

  await user.save();
  ctx.status = 201;
}

module.exports = {
  login: compose([
    passport.authenticate('local', {session: false}),
    (ctx, next) => {
      ctx.body = ctx.state.user;
    },
  ]),
  register,
};
