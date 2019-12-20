const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
  MONGODB_HOST = 'localhost',
  MONGODB_PORT = '27017',
  MONGODB_DB = 'images'
} = process.env;

const url = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const IMAGE_STATUS = {
  PENDING: 'pending',
  ERROR: 'error',
  DONE: 'done',
};

const imageSchema = new Schema({
    path: new Schema({
      raw: {
        type: String,
        required: true,
      },
      wm: {
        type: String,
      }
    }, {_id: false}),
    mimetype: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(IMAGE_STATUS)
    }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    toDocument: {
      virtuals: true,
      versionKey: false,
    },
  });

const Image = mongoose.model('image', imageSchema);

module.exports = {
  IMAGE_STATUS,
  Image,
};
