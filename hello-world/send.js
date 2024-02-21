var amqp = require("amqplib");

const sendMessege = async () => {
  var queue = "hello2";
  var msg = "Hello ghtrjht";

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: false,
  });
  await channel.sendToQueue(queue, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMessege();
