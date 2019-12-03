const Router = require('koa-router');
const router = new Router();

const users = [];

router.post('/login', async (ctx, next) => {

  const user = users.find(u => {
    return u.name === ctx.request.body.name &&
      u.password === ctx.request.body.password
  });

  if (!user) {
    ctx.throw(401);
  }

  ctx.body = user; // (ctx.request.body)
});

router.post('/register', async (ctx, next) => {
  console.log('register', ctx.request.body);
  users.push(ctx.request.body);
  console.log(users);
  ctx.status = 201;
});

module.exports = router;
