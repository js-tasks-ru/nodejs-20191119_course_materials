const [, , a, b] = process.argv;
setTimeout(() => {
  const result = parseInt(a, 10) + parseInt(b, 10);
  if (!process.send) {
    console.log(result)
  } else {
    process.send(result);
  }
}, 500);
