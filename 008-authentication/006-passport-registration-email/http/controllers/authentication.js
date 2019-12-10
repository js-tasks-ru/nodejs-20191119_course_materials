const User = require('./../../models/User');
const Token = require('./../../models/Token');
const getProvider = require('./oauth');
const {NotAuthorized} = require("../errors");
const issueToken = require('../middleware/passport/issueToken');
const {sendHtml, template} = require('./../../mail/index');

async function register(ctx, next) {
  const {login, password, email} = ctx.request.body;
  const user = new User({login, password, email});

  await user.save();

  const body = template.welcome({
    username: user.login,
    homeUrl: ctx.request.origin || "http://localhost:3000/",
  });
  await sendHtml(email, "Добро пожаловать!", body);
  ctx.status = 201;
}

async function oauth(ctx, next) {
  const provider = getProvider(ctx.params.provider);
  await provider(ctx, next);
}

async function oauthCallback(ctx, next) {
  const provider = getProvider(ctx.params.provider);
  await provider(ctx, next);
}

async function user(ctx, next) {
  if (!ctx.isAuthenticated()) {
    throw new NotAuthorized()
  }

  ctx.body = ctx.state.user;
}

async function refresh(ctx, next) {
  const {accessToken, refreshToken} = ctx.request.body;
  const token = await Token.findOneAndDelete({accessToken, refreshToken}).exec();
  if (token) {
    const user = await User.findById(token.sub);
    const [accessToken, refreshToken] = await issueToken(user);
    ctx.body = {
      accessToken,
      refreshToken,
    };
    return;
  }
  throw new NotAuthorized()
}

module.exports = {
  user,
  register,
  oauth,
  oauthCallback,
  jwt: require('./oauth/jwt'),
  refresh,
};
