console.log("console.log-1");

setTimeout(() => {
  console.log('setTimeout');
}, 0);

queueMicrotask(() => {
  console.log('queueMicrotask');
});

new Promise((resolve, reject) => {
  console.log('new Promise');
  resolve();
}).then(
  _ => {
    console.log('then');
  }).finally(
  _ => {
    console.log('finally');
  }
);

console.log('console.log-2');

/*

stack: []
micro: []
macro: []

new Promise(executor)
.then(onResolve, onReject)
.catch(onReject) === .then(null, onReject)


Event loop pseudocode:

while (true) {

  const task = await getNextTask();
  execute(task);

  if (!hasNextTask()) {
    break;
  }

}



 */
