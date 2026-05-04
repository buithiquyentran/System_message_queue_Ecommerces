const mongoose = require("mongoose");
const connectString = "mongodb://localhost:27017/DevEcommerce";
const TestSchema = new mongoose.Schema({
  name: String,
});
const Test = mongoose.model("Test", TestSchema);

describe("MongoDB Connection", () => {
  let connection;
  beforeAll(async () => {
    connection = await mongoose.connect(connectString);
  });

  //Close connection to moongoDB
  afterAll(async () => {
    await connection.disconnect();
  });

  it("should connect to MongoDB successfully", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
  it("should have the correct database name", async () => {
    const user = new Test({ name: "Bui T. Quyen Tran" });
    await user.save();
    expect(user.isNew).toBe(false);
  });
  it("should find a document in the collection", async () => {
    const user = await Test.findOne({ name: "Bui T. Quyen Tran" });
    expect(user).not.toBeNull();
    expect(user.name).toBe("Bui T. Quyen Tran");
  });
});
