const Koa = require('koa');
const bootsrap = require('./bootstrap');

/**
 * POST /login
 * POST /register
 */

const app = new Koa();

bootsrap(app);


app.listen(3000);
