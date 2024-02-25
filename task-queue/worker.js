var amqp = require("amqplib");

const receiveMsg = async () => {
  var queue = "queue-1";

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: true,
  });
  channel.prefetch(1);

  console.log(`Waiting for messages in queue: ${queue}`);
  channel.consume(
    queue,
    (msg) => {
      const secs = msg.content.toString().split(".").length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(() => {
        console.log("Done resizing image");
        channel.ack(msg);
      }, secs * 1000);
    },

    {
      noAck: false,
    }
  );
};

receiveMsg();
