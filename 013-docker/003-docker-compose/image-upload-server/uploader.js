const {randomBytes} = require('crypto');
const multer = require('@koa/multer');
const mime = require('mime');
const storage = multer.diskStorage({
  destination: process.env.UPLOAD_DIR,
  filename: (req, file, cb) => {
    randomBytes(24, (err, buffer) => {
      if (err) cb(err);
      const name = buffer.toString('hex');
      const extension = mime.getExtension(file.mimetype);
      cb(null, `${name}.${extension}`)
    });
  }
});
const upload = multer({storage});

module.exports = upload;
