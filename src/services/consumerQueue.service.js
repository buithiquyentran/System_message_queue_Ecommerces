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
  // consummer to queue normal
   consumeToQueueNormal: async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error in message service:", error);
      throw error;
    }
  },
};

module.exports =  messageService ;
