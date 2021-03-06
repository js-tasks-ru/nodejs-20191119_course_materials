const Router = require('koa-router');
const {register, user, jwt, oauth, oauthCallback, refresh} = require('./../controllers/authentication');

const router = new Router({prefix: '/api'});

router.post('/register', register);
router.post('/refresh', refresh);

router.post('/oauth/:provider', oauth);
router.get('/oauth/:provider', oauth);
router.get('/oauth/:provider/callback', oauthCallback);

router.get('/user', jwt, user);


module.exports = router;
