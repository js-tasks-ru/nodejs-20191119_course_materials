const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law-short.txt');

const readStream = createReadStream(FILE_NAME, {
  highWaterMark: 5, // 2**16
  encoding: 'utf-8'
});

let data = '';
readStream.on('data', chunk => {
  data += chunk;
});

readStream.once('close', () => {
  console.log("Stream closed");
  console.log(data);
});
