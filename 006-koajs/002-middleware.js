const Koa = require('koa');

const app = new Koa();

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

class MyError extends Error {
  constructor(message) {
    super(message);
    this.code = 1;
    this.httpStatus = 413;
  }
}

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e instanceof MyError) {
      ctx.response.status = e.httpStatus;
      ctx.response.body = {
        message: e.message,
        code: e.code,
      };
      return;
    }

    throw e;
  }
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(`Time: ${end - start}ms`);
});

app.use(async (ctx, next) => {
  console.log('Middleware 2');
  return next()
});

app.use(async (ctx, next) => {
  console.log('Middleware 3');
  // throw new Error('random error');
  throw new MyError('my message');
  // await delay(400);
  return next()
});

app.listen(3000);

/**
 * req ->      res ->
 *     mw1     mw1
 *      mw2   mw2
 *       mw3 mw3
 *         mw4
 */

