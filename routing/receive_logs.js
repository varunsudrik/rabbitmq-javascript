var amqp = require("amqplib");

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

const receiveMsg = async () => {
  var exchangeName = "direct-logs";

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct", {
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });
  // channel.prefetch(1);

  console.log(`Waiting for messages in queue: ${q.queue}`);
  // channel.bindQueue(q.queue, exchangeName, "info");
  // channel.bindQueue(q.queue, exchangeName, "warning");
  // channel.bindQueue(q.queue, exchangeName, "error");
  args.forEach(function (severity) {
    channel.bindQueue(q.queue, exchangeName, severity);
  });
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
