const config = require('config');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true
  },
  sub: String,
  ts: {
    type: Date,
    default: new Date(),
  }
});

schema.index({accessToken: 1, refreshToken: 1});
                                           // "30d"
schema.index({ts: 1}, {expires: config.get('auth.refreshToken.expiresIn')});

module.exports = mongoose.model('token', schema);
