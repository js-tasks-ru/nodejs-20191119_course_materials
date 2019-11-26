const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME);

/* async iterator */
readStream.once('close', () => {
  console.log("Stream closed");
});

(async function () {

  let totalSize = 0;
  for await (let chunk of readStream) {  // on('data', ...) // readStream === [Promise...]
    console.log(`Read ${chunk.length} bytes`);
    // await asyncOperation(chunk);
    totalSize += chunk.length;
  }
  console.log(`Total size: ${totalSize}`);

})()
  .catch(error => {
    console.log(error);
  });

