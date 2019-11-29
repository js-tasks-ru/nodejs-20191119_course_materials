const axios = require('axios');
const {expect} = require('chai');

const server = require('./server');

describe('server', () => {
  let url;

  before(done => {
    server.listen((err) => {
      if (err) {
        return done(err)
      }
      url = `http://localhost:${server.address().port}`;
      done();
    });
    // bootstrapDB()
  });

  after(done => {
    server.close(done);
    // cleanUpDB();
  });

  it('should start server', () => {
    expect(server.listening).to.be.true;
  });

  it('should return a list of users', async () => {
    const {data, status} = await axios.get(`${url}/user`);
    expect(status).to.be.equal(200);
    expect(data).to.be.instanceof(Array)
      .lengthOf(3);
  });

  it('should return a user by id', async () => {
    const {data, status} = await axios.get(`${url}/user/1`);
    expect(status).to.be.equal(200);
    expect(data).to.have.property('id', 1);
    expect(data).to.have.property('login', 'user2');
    expect(data).to.have.property('email', 'user2@mail.com');
  });

});
