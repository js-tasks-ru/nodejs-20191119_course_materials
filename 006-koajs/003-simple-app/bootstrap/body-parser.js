// app.use(async (ctx, next) => {
//   const chunks = [];
//   await new Promise(resolve => {
//     ctx.req.on('data', (chunk, encoding) => {
//       chunks.push(chunk);
//     });
//
//     ctx.req.on('end', () => {
//       ctx.body = ctx.request.body = JSON.parse(Buffer.concat(chunks).toString())
//       resolve();
//     })
//   });
//   return next();
// });

module.exports = require('koa-bodyparser')({});
