const { connectToRabbitMQForTest } = require("../dbs/init.rabbit");
describe("RabbitMQ Connection", () => {
  it("should connect to RabbitMQ successfully", async () => {
    const result = await connectToRabbitMQForTest();
    expect(result).toBeUndefined();
  });
});
