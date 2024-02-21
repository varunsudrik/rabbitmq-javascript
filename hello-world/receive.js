var amqp = require("amqplib");

const receiveMsg = async () => {
  var queue = "hello2";

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: false,
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(
    queue,
    (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    },
    {
      noAck: true,
    }
  );
};

receiveMsg();
