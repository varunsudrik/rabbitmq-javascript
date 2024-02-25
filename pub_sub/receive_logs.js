var amqp = require("amqplib");

const receiveMsg = async () => {
  var exchangeName = "logs-1";

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout", {
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });
  // channel.prefetch(1);

  console.log(`Waiting for messages in queue: ${q.queue}`);
  channel.bindQueue(q.queue, exchangeName, "");
  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        console.log(`Got message: ${msg.content.toString()}`);
      }
    },

    {
      noAck: true,
    }
  );
};

receiveMsg();
