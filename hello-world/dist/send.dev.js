"use strict";

// var amqp = require("amqplib");
// const sendMessege = async () => {
//   var queue = "hello2";
//   var msg = "Hello ghtrjht";
//   const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
//   const channel = await connection.createChannel();
//   await channel.assertQueue(queue, {
//     durable: false,
//   });
//   await channel.sendToQueue(queue, Buffer.from(msg));
//   console.log(" [x] Sent %s", msg);
//   setTimeout(() => {
//     connection.close();
//     process.exit(0);
//   }, 500);
// };
// for (i = 0; i < 50000; i++) {
//   sendMessege();
// }
var amqplib = require("amqplib");

var queueName = "wdj";
var msg = "comment";

var sendMsg = function sendMsg() {
  var connection, channel;
  return regeneratorRuntime.async(function sendMsg$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(amqp.connect("amqp://myuser:mypassword@localhost"));

        case 2:
          connection = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.createChannel());

        case 5:
          channel = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(channel.assertQueue(queueName, {
            durable: false
          }));

        case 8:
          channel.sendToQueue(queueName, Buffer.from(msg));
          console.log("Sent: ", msg);
          setTimeout(function () {
            connection.close();
            process.exit(0);
          }, 500);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

sendMsg();