const fs = require('fs').promises;

setTimeout(() => {
  console.log('setTimeout-1');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

queueMicrotask(() => {
  console.log('queueMicrotask-1');
});

process.nextTick(() => {
  console.log('nextTick');
});

async function asyncFunction() {
  console.log('asyncFunction-1');
  await Promise.resolve();
  console.log('asyncFunction-2');
  await fs.open(__filename);
  console.log('asyncFunction-3');
}

asyncFunction();

