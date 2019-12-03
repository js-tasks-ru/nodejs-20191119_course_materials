const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  // ctx.req -> http.IncomingMessage
  // ctx.request -> koa.Request

  // console.log('url: ', ctx.request.url);
  // console.log('query: ', ctx.request.querystring);
  // console.log('path: ', ctx.request.path);
  // console.log('query params', ctx.request.query);
  // console.log('method: ', ctx.request.method);
  // console.log('headers: ', ctx.request.headers);
  console.log('accepts: ', ctx.accepts('application/json'));

  // ctx.res -> http.ServerResponse
  // ctx.response -> koa.Response

  // ctx.response.body = 'Hello world'; // res.send
  // ctx.response.body = fs.createReadStream(...)
  // ctx.response.body = Buffer.from(...)

  // ctx.response.set('content-type', 'application/json');
  // ctx.response.set('x-content-type', 'application/json');
  // ctx.cookies.set('my-cookie', 'test', {});
  ctx.response.body = {
    foo: 'bar'
  };
  ctx.status = 201;
  // ctx.response.status = 201;
  // ctx.throw(404, 'Resource not found', {resource: 'user'});
  // ctx.response.redirect('https://google.com')
});

app.listen(3000, () => {
  console.log('Server started');
});
