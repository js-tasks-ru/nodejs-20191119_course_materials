const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const READ_SIZE = 2 ** 17; // Math.pow(2, 16);

const readStream = createReadStream(FILE_NAME, {highWaterMark: 2 ** 16}); // 64k - default
/* UV_THREADPOOL_SIZE=4 (file system, crypto, zlib, dns)*/
/* read method */

let totalSize = 0;

readStream.on('readable', function () {
  let chunk = readStream.read(READ_SIZE);
  while (null !== chunk) {
    console.log(`Received ${chunk.length} bytes of data.`);
    totalSize += chunk.length;
    chunk = readStream.read(READ_SIZE);
  }
});

readStream.once('end', () => {
  console.log(`Total size: ${totalSize}`);
});

readStream.once('close', () => {
  console.log("Stream closed");
});


