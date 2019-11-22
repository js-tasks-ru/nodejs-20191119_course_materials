const {EventEmitter} = require('events');

const ee = new EventEmitter();

class MyEmitter extends EventEmitter {
  constructor() {
    super()
  }
}

const myEE = new MyEmitter();
myEE.on('event', console.log);
myEE.emit('event', 'hello');

