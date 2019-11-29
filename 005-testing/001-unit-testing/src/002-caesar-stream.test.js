const {expect} = require('chai');
const {Readable, Writable} = require('stream');

const {CaesarCipherEncode} = require('./002-caesar-stream');

const toString = (cb) => {
  let string = '';
  return new Writable({
    write(chunk, encoding, callback) {
      string += chunk.toString();
      return callback();
    },
    final(callback) {
      cb(string)
    }
  })
};

describe('CaesarCipherEncode', () => {
  it('should create a instance of CaesarCipherEncode', () => {
    expect(new CaesarCipherEncode()).to.be.instanceOf(CaesarCipherEncode)
  });

  it('should encode stream', (done) => {
    const input = Readable.from('ABC');
    const shift = 1;
    const expectation = 'BCD';
    const encoder = new CaesarCipherEncode(shift);

    input.pipe(encoder).pipe(toString((actual) => {
      expect(actual).to.be.equal(expectation);
      done();
    }));

  });
});
