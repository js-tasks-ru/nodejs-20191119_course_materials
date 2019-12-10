const Router = require('koa-router');
const {login, register} = require('./../controllers/authentication');

const router = new Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;
