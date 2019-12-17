const Koa = require('koa');
const Router = require('koa-router');
const morgan = require('koa-morgan');

const app = new Koa();
const router = new Router();

router.get('/posts', ctx => {
  ctx.body = {
    posts: [{
      authorId: 42,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      text: 'Nulla sit amet arcu rutrum, gravida erat eu, imperdiet velit. ' +
        'Integer tincidunt erat nec lectus convallis varius. Duis dictum suscipit ' +
        'quam in accumsan. In sit amet cursus elit. Proin tincidunt, lectus et semper ' +
        'pharetra, urna purus egestas mi, vel luctus enim sapien at sem. Lorem ipsum ' +
        'dolor sit amet, consectetur adipiscing elit. Praesent eu erat id justo euismod ' +
        'facilisis. Aliquam eleifend id nulla a ultricies. Curabitur egestas bibendum ' +
        'mi ut dapibus. Proin ornare erat ut placerat vestibulum. Integer vestibulum, ' +
        'diam eu imperdiet sodales, purus felis cursus justo, ac varius sem orci quis est. ' +
        'Nam vitae massa pellentesque, semper magna sed, faucibus nunc.',
      rating: 12,
    }]
  };
});

app.use(morgan('dev'));
app.use(router.middleware());
// by default 0.0.0.0

app.listen(process.env.NODE_PORT || 3000, '127.0.0.1');
