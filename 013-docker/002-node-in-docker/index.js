const Koa = require('koa');
const morgan = require('koa-morgan');

const app = new Koa();

const port = process.env.NODE_PORT || 3000;

app.use(morgan('tiny'));

app.use((ctx) => {
  ctx.body = "Hello world";
});

app.listen(port);
