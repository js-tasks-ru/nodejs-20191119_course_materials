const compose = require('koa-compose');
const providers = {
  github: require('./github'),
  local: require('./local'),
};

module.exports = function getProvider(name) {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Provider ${name} not implemented`)
  }
  return compose([
    provider,
    (ctx, next) => {
      ctx.body = ctx.state.user;
    },
  ]);
};
