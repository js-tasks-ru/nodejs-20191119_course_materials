setTimeout(() => {
  console.log('setTimeout 1');
  queueMicrotask(() => {
    console.log('queueMicrotask 2');
  });
  process.nextTick(() => {
    console.log('nextTick 2');
  });
}, 0);
//
// setTimeout(() => {
//   console.log('setTimeout 2');
//   queueMicrotask(() => {
//     console.log('queueMicrotask 3');
//   });
//   process.nextTick(() => {
//     console.log('nextTick 3');
//   });
// }, 0);
//
// queueMicrotask(() => {
//   console.log('queueMicrotask 1');
// });
//
// process.nextTick(() => {
//   console.log('nextTick 1');
// });
