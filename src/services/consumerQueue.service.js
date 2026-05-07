const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit");

const messageService = {
  consumeToQueue: async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error in message service:", error);
      throw error;
    }
  },
  // case processing
  consumeToQueueNormal: async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      const notiQueue = "notificationQueue";
      setTimeout(() => {
        channel.consume(notiQueue, (msg) => {
          if (msg !== null) {
            console.log("Received message:", msg.content.toString());
            channel.ack(msg);
          }
        });
      }, 5000);
    } catch (error) {
      console.error("Error in message service:", error);
      throw error;
    }
  },
  // case failed processing -> set up DLX
  consumeToQueueDLX: async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      const notificationExchangeDLX = "notificationExDLX"; // notification direct exchange
      const notificationRoutingKeyDLX = "notificationDLX";
      const notiQueueDLX = "notificationQueueDLX";

      await channel.assertExchange(notificationExchangeDLX, "direct", {
        durable: true,
      });
      const queueResultDLX = await channel.assertQueue(notiQueueDLX, {
        exclusive: false,
      });
      await channel.bindQueue(
        queueResultDLX.queue,
        notificationExchangeDLX,
        notificationRoutingKeyDLX,
      );
      await channel.consume(
        queueResultDLX.queue,
        (msg) => {
          if (msg !== null) {
            console.log(
              "This is a message from the DLX queue:",
              msg.content.toString(),
            );
            channel.ack(msg);
          }
        },
        (noAck = true),
      );
    } catch (error) {
      console.error("Error in message service:", error);
      throw error;
    }
  },
};

module.exports = messageService;
