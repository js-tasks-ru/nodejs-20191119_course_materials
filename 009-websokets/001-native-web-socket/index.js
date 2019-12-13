const Koa = require('koa');
const serve = require('koa-static');
const websockify = require('koa-websocket');

const app = websockify(new Koa());

const clients = new Set();

app.use(serve('./public'));

app.ws.use((ctx, next) => {

  // ctx.request
  // ctx.response

  ctx.websocket.on('message', msgRaw => {
    const message = JSON.parse(msgRaw);
    switch (message.type) {
      case 'start': {
        clients.add(ctx.websocket);
        break;
      }
      case 'message': {
        for (const client of clients.values()) {
          if (client === ctx.websocket) continue;
          client.send(JSON.stringify({type: 'message', message: message.message, from: message.name}))
        }
      }
    }
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('Server started');
});
