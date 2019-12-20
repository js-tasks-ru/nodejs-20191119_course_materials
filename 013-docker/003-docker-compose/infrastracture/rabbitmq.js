const amqp = require('amqplib');

const {
  AMQP_HOST,
  AMQP_PORT,
  AMQP_QUEUE,
} = process.env;
let connection;
let channel;

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const getConnection = async () => {
  if (!connection) {
    let counter = 10;
    while (counter || !connection) {
      counter--;
      console.log(`Connecting to amqp...`);
      try {
        connection = await amqp.connect(`amqp://${AMQP_HOST}:${AMQP_PORT}`).then(conn => conn);
        console.log('Success!');
        return connection;
      } catch (e) {
        console.log(`Failed: ${e.message}`);
        if (!counter) {
          throw e;
        }
        await delay(1000);
      }
    }
  }
  return connection
};

const getChannel = () => {
  if (!channel) {
    channel = getConnection()
      .then(conn => conn.createChannel())
      .then(ch => {
        return ch.assertQueue(AMQP_QUEUE)
          .then(() => ch)
      })
  }
  return channel;
};


module.exports = {
  async publish(data) {
    const channel = await getChannel();
    await channel.sendToQueue(AMQP_QUEUE, Buffer.from(JSON.stringify(data)))
  },

  async consume(handler) {
    const channel = await getChannel();
    await channel.consume(AMQP_QUEUE, async msg => {
      // todo: error handling
      const body = JSON.parse(msg.content.toString());
      await handler(body);
      channel.ack(msg)
    })
  }
};
