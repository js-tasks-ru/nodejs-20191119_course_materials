const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('config');
const applyMiddlewares = require('./http/middleware');

mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = config.get('app.port') || 3000; // config.app.port
const app = new Koa();

applyMiddlewares(app);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
