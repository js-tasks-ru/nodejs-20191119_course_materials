// npm -g i pm2
// pm2 start index.js -i max

const {Server} = require('http');

const server = new Server((req, res) => {
  if (Math.random() > 0.5) process.exit(1);
  res.end('hello')
});

server.listen(3000);
