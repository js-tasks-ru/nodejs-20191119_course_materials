require('dotenv').config();
const Koa = require('koa');
const morgan = require('koa-morgan');

const app = new Koa();

const router = require('./router');

app.use(morgan('tiny'));
app.use(router.middleware());

app.listen(process.env.IMAGE_UPLOAD_SERVER_PORT, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started at port ${process.env.IMAGE_UPLOAD_SERVER_PORT}`);
});
