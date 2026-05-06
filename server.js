const { consumeToQueue } = require("./src/services/consumerQueue.service");

const queueName = "test-topic";
consumeToQueue(queueName)
  .then(() => {
    console.log(`Started consuming messages from queue: ${queueName}`);
  })
  .catch((error) => {
    console.error("Error starting consumer:", error);
  });
