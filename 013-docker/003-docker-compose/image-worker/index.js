require('dotenv').config();
const path = require('path');

const Jimp = require('jimp');

const {consume} = require('./../infrastracture/rabbitmq');
const {Image, IMAGE_STATUS} = require('./../infrastracture/db');

consume(async ({id}) => {
  const image = await Image.findById(id);

  const [logo, source] = await Promise.all([
    Jimp.read(path.resolve(process.cwd(), process.env.ASSET_LOGO)),
    Jimp.read(path.resolve(process.cwd(), image.path.raw))
  ]);

  await logo.scaleToFit(source.getWidth(), source.getHeight());

  const y = (source.getHeight() - logo.getHeight()) / 2;
  const x = (source.getWidth() - logo.getWidth()) / 2;

  await source.composite(logo, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
  });

  const {dir, name, ext} = path.parse(image.path.raw);
  image.path.wm = `${dir}/${name}-wm${ext}`;

  await source.write(image.path.wm);

  image.status = IMAGE_STATUS.DONE;
  await image.save();
});
