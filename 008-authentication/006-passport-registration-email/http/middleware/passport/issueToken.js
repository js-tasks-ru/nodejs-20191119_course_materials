const config = require('config');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const TOKEN_SECRET = config.get('auth.jwt.secret');
const TOKEN_ALGORITHM = config.get('auth.jwt.algorithm');
const TOKEN_EXPIRES_IN = config.get('auth.jwt.expiresIn');
const Token = require('../../../models/Token');

module.exports = async function issueToken(user) {
  const accessToken = jwt.sign({sub: user.id}, TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM,
    expiresIn: TOKEN_EXPIRES_IN,
  });
  const refreshToken = uuid();
  await Token.create({accessToken, refreshToken, sub: user.id});
  return [accessToken, refreshToken];
};
