const Router = require('koa-router');
const {login, register, home, logout} = require('./../controllers/authentication');

const router = new Router();

router.post('/login', login);
router.get('/home', home);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
