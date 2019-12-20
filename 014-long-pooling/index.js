const Koa = require('koa');
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const clients = new Set();

router.get('/messages', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    clients.add(resolve);
    // resolve();
  }).then(data => {
    ctx.body = data;
  })
});

router.get('/publish', (ctx, next) => {
  const {message} = ctx.query;

  clients.forEach(resolve => {
    resolve(message);
  });
  clients.clear();
  ctx.status = 200;
});

app.use(router.middleware());

app.listen(3000);
