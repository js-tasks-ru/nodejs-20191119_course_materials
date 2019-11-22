
console.log("console.log-1");

new Promise(
  (resolve, reject) => {
    console.log('new Promise');
    resolve();
  }
).then(() => {
  console.log('then');
});

console.log('console.log-2');
