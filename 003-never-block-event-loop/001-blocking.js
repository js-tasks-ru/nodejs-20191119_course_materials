const {Server} = require('http');

const server = new Server();

function blockingOperation(timeMS) {
  const start = Date.now();
  while (true) {
    if (Date.now() > start + timeMS) {
      return;
    }
  }
}

server.on('request', (req, res) => {
  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  blockingOperation(500);
  res.end();
});

server.on("listening", () => {
  console.log('Server started')
});

server.listen(3000);

// for (let i = 0; i < 5; i++) fetch(`http://localhost:3000/?r=${Math.random()}`);
// ab -n 5 -c 5 http://localhost:3000/
