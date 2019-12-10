const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('config');
const applyMiddlewares = require('./http/middleware');

mongoose.connect(`${config.get('mongodb.url')}/${config.get('mongodb.db')}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.set('debug', true);

const port = config.get('app.port') || 3000;
const app = new Koa();

applyMiddlewares(app);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
