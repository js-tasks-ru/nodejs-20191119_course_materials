
setTimeout(() => {
  console.log('setTimeout-1');
}, 10);

setImmediate(() => {
   console.log('setImmediate');
});

queueMicrotask(() => {
  console.log('queueMicrotask-1');
});

process.nextTick(() => {
  console.log('nextTick');
});

/*

  stack: []
  nextT: []
  micro: []
  macro: []
  immed: [setImmediate]

 */
