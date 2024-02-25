var amqp = require("amqplib");

const sendMessege = async () => {
  var exchangeName = "direct-logs";
  const args = process.argv.slice(2);

  var msg = args[1] || "Hello World!";
  const logType = args[0];

  const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct", {
    durable: false,
  });
  await channel.publish(exchangeName, logType, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMessege();
