const {createReadStream, createWriteStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME, {highWaterMark: 2 ** 16});
const writeStream = createWriteStream(`${FILE_NAME}.bak`, {flags: 'wx', highWaterMark: 2 ** 8});


/* pipe method */

readStream.pipe(writeStream).on('error', err => {
  console.log(`Write error ${err.message}`);
});

readStream.on('error', err => {
  console.log(`Read error: ${err.message}`);
  // delete junk file
});

// writeStream.on('error', );

readStream.once('close', () => {
  console.log("Stream closed");
});
