const {encode} = require("./001-caesar");
const {Transform} = require('stream');

class CaesarCipherEncode extends Transform {
  shift = 0;

  constructor(shift) {
    super();
    this.shift = shift
  }

  _transform(chunk, encoding, callback) {
    callback(null, encode(this.shift, chunk.toString()))
  }
}

module.exports = {
  CaesarCipherEncode
};
