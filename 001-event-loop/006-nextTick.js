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

/*
 stack:
 macro: timeout
 micro: queueMicrotask, setImmediate
 nextTick: nextTick
 */



