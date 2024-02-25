var amqp = require("amqplib");

const sendMessege = async () => {
  var queue = "queue-1";
  var msg = process.argv.slice(2).join(" ") || "Hello World!";

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: true,
  });
  await channel.sendToQueue(queue, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMessege();
