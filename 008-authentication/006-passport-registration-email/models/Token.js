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
});

schema.index({accessToken: 1, refreshToken: 1});
schema.index({refreshToken: 1}, {expires: config.get('auth.refreshToken.expiresIn')});

module.exports = mongoose.model('token', schema);
