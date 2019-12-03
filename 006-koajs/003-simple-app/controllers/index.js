
const Router = require('koa-router');

const auth = require('./authentication');

const router = new Router();

router.use('/auth', auth.middleware());

module.exports = router;
