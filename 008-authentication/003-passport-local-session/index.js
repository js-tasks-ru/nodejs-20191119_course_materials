const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('config');
const applyMiddlewares = require('./http/middleware');

mongoose.connect('mongodb://localhost:27017/auth_login_register', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = config.get('app.port') || 3000;
const app = new Koa();

applyMiddlewares(app);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
