const {EventEmitter} = require('events');

const ee = new EventEmitter();
ee.on('event', console.log);
ee.emit('event', 'hello-1');

class MyEmitter extends EventEmitter {
  constructor() {
    super()
  }
}

const myEE = new MyEmitter();
myEE.on('event', console.log);
myEE.emit('event', 'hello-2');

