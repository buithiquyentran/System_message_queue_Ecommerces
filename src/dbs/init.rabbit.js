// import amqp from "amqplib";
const amqp = require("amqplib");
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    if (!connection) {
      throw new Error("Failed to connect to RabbitMQ");
    }
    console.log("Connected to RabbitMQ successfully");
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};
const connectToRabbitMQForTest = async () => {
  try {
    const {connection, channel} = await connectToRabbitMQ();
    //publish a test message to the queue
    const queue = "test-queue";
    const message = "Hello, shopeDev by BuiQuyenTran!";
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));

    //close connection
    await connection.close();
  } catch (error) {
    console.error("Error connecting to RabbitMQ for test:", error);
    throw error;
  }
};
module.exports = { connectToRabbitMQ, connectToRabbitMQForTest };
