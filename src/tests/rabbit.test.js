const { connectToRabbitMQForTest } = require("../dbs/init.rabbit");
// import { connectToRabbitMQForTest } from "../dbs/init.rabbit.js";
describe("RabbitMQ Connection", () => {
  it("should connect to RabbitMQ successfully", async () => {
    const result = await connectToRabbitMQForTest();
    expect(result).toBeUndefined();
  });
});
