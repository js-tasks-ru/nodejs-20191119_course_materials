console.log("console.log-1");

setImmediate(() => {
  console.log('setImmediate')
});

console.log('console.log-2');
