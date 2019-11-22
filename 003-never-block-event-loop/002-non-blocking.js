const {Server} = require('http');

const server = new Server();

function nonBlockingOperation(timeMS) {
  return new Promise(resolve => setTimeout(resolve, timeMS))
}

server.on('request', (req, res) => {
  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  nonBlockingOperation(500)
    .then(_ => {
      res.end();
    });
});

server.on("listening", () => {
  console.log('Server started')
});

server.listen(3000);


// for (let i = 0; i < 5; i++) fetch(`http://localhost:3000/?r=${Math.random()}`);
// ab -n 5 -c 5 http://localhost:3000/
