const sinon = require('sinon');
const {expect} = require("chai");

const retry = require('./004-retry');

describe('retry', () => {

  // before();
  // after();
  //
  // beforeEach();
  // afterEach();

  afterEach(() => {
    sinon.restore();
  });

  it('should be a function', () => {
    expect(retry).to.be.a('function');
  });

  it('should call passed function and return it\'s result if any', async () => {
    const timeout = 1000;
    const result = 4;
    const fn = sinon.stub().returns(result);
    const self = {};
    const args = [1, 2, 3];

    const actual = await retry(timeout, fn, self, ...args);

    expect(actual).to.be.equal(result);
    expect(fn.calledOnce, 'expected fn to be called once').to.be.true;
    expect(fn.firstCall.args).to.be.deep.equal(args);
    expect(fn.calledOn(self)).to.be.true;
  });

  it('should call passed function second time if error has been returned after the first call', async () => {
    const timeout = 0;
    const result = 4;
    const fn = sinon.stub()
      .onFirstCall().throws(new Error())
      .onSecondCall().returns(result);

    const actual = await retry(timeout, fn);

    expect(actual).to.be.equal(result);
    expect(fn.calledTwice, 'expected fn to be called twice').to.be.true;
  });

  it('should call the function second time after specified amount of time', async () => {
    const timeout = 1000;
    const result = 4;
    const clock = sinon.useFakeTimers();
    const fn = sinon.stub()
      .onFirstCall().throws(new Error())
      .onSecondCall().returns(result);

    const actualPromise = retry(timeout, fn);

    await Promise.resolve();

    clock.tick(timeout);

    const actual = await actualPromise;

    expect(fn).to.have.been.calledTwice;
    expect(actual).to.be.equal(result);
  });

})
;
