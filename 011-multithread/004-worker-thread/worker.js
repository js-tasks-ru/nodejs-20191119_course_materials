const {workerData, parentPort} = require('worker_threads');

const {a, b} = workerData;

setTimeout(() => {
  parentPort.postMessage(parseInt(a, 10) + parseInt(b, 10));
}, 500);
