const { consumeToQueue, consumeToQueueNormal, consumeToQueueDLX } = require("./src/services/consumerQueue.service");

// const queueName = "test-topic";
// consumeToQueue(queueName)
//   .then(() => {
//     console.log(`Started consuming messages from queue: ${queueName}`);
//   })
//   .catch((error) => {
//     console.error("Error starting consumer:", error);
//   });

const queueName = "notificationQueue";
consumeToQueueNormal(queueName)
  .then(() => {
    console.log(`Started consuming to queue normal`);
  })
  .catch((error) => {
    console.error("Error starting consumer:", error);
  });

consumeToQueueDLX(queueName)
  .then(() => {
    console.log(`Started consuming to queue DLX`);
  })
  .catch((error) => {
    console.error("Error starting consumer:", error);
  });
