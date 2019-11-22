console.log("console.log-1");  //<

setTimeout(() => { console.log('setTimeout'); }, 0); // << macro

queueMicrotask(() => {
  console.log('queueMicrotask'); //< micro
});

new Promise((resolve, reject) => {
  console.log('new Promise'); //<
  resolve();
}).then(_ => {
  console.log('then') // << micro
});

console.log('console.log-2'); //<

/*
stack: [setTimeout]
micro: []
macro: []
 */
