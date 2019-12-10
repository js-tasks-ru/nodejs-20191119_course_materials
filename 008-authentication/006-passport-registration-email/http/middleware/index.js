const config = require('config');
const bodyParser = require('koa-bodyparser');
const passport = require('./passport');
const routes = require('./../routes');

module.exports = (app) => {
  app.keys = [config.get('session.secret')];
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(routes.middleware())
};
