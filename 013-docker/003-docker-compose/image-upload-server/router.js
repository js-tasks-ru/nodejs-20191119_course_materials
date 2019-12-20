const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const router = new Router();

const upload = require('./uploader');
const {Image, IMAGE_STATUS} = require('../infrastracture/db');
const {ACCEPTED} = require('http-status-codes');
const {publish} = require('./../infrastracture/rabbitmq');

router.post('/image',
  upload.single('image'),
  async ctx => {
    ctx.body = await Image.create({
      path: {raw: ctx.file.path},
      mimetype: ctx.file.mimetype,
      status: IMAGE_STATUS.PENDING,
    });
    await publish({id: ctx.body.id});
    ctx.status = ACCEPTED;
  },
);

router.get('/image/:imageId', async ctx => {
  const {imageId} = ctx.params;
  ctx.body = await Image.findById(imageId);
});

router.get('/img/(.*).png', async ctx => {
  const imageId = ctx.params['0'];
  const image = await Image.findById(imageId);

  if (!image || image.status !== IMAGE_STATUS.DONE) {
    ctx.status = 404;
    return;
  }

  ctx.set('Content-Type', image.mimetype);
  ctx.body = fs.createReadStream(path.resolve(process.cwd(), image.path.wm));
});

module.exports = router;
