const {Server} = require('http');

const server = new Server();

const db = [
  {
    id: 0,
    login: 'user1',
    email: 'user1@mail.com'
  },
  {
    id: 1,
    login: 'user2',
    email: 'user2@mail.com'
  },
  {
    id: 2,
    login: 'user3',
    email: 'user3@mail.com'
  }
];

const userIdRE = /^\/user\/(\d+)$/;

server.on('request', (req, res) => {
  const {method, url} = req;
  switch (true) {
    default:
      res.statusCode = 404;
      res.end(method + url);
      break;
    case method === 'GET' && url === '/user' :
      res.statusCode = 200;
      res.end(JSON.stringify(db));
      break;
      // user/1
    case method === 'GET' && userIdRE.test(url) :
      const [, id] = userIdRE.exec(url);
      res.statusCode = 200;
      res.end(JSON.stringify(db[id]));
      break;
  }
});

module.exports = server;
