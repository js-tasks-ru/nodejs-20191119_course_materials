const fs = require('fs');

console.log('start');                 // 1

new Promise((resolve, reject) => {
  console.log('new Promise');  // 2
  resolve();
}).then(_ => {
  console.log('then-1'); // 6
}).then(_ => {
  console.log('then-2'); // 7
});

setTimeout(_ => {
  console.log('setTimeout'); // 8
}, 0);

setImmediate(_ => {
  console.log('setImmediate'); // 11
});

fs.open(__filename, _ => {
  console.log('fs.open'); // 9
  queueMicrotask(_ => {
    console.log('queueMicrotask-1'); // 10
    queueMicrotask(_ => {
      console.log('queueMicrotask-2'); // 11
    })
  });
});

process.nextTick(_ => {
  console.log('nextTick-1'); // 4
  process.nextTick(_ => {
    console.log('nextTick-2');  // 5
  });
});

console.log('end'); // 3
