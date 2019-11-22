function promise() {
  return Promise.resolve()
    .then(promise)
}

function nextTick() {
  process.nextTick(nextTick)
}

setTimeout(_ => {
  console.log('timeout');
});

// promise();
nextTick();

console.log('end');
