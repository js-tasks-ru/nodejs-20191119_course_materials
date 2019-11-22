const {EventEmitter} = require('events');

const ee = new EventEmitter();

ee.on('event', (/* args */) => {
});
// ee.addListener('event', handler); handlers.push
// ee.prependListener('event', handler); handlers.unshift

ee.once('event', (/* args */) => {
});
// ee.prependOnceListener('event', handler)

ee.emit('event', /* args */);

ee.off('event', () => {
});
// ee.removeListener(event, handler)
// ee.removeAllListeners('event');

ee.getMaxListeners();
ee.setMaxListeners(10);
ee.listenerCount('event');
