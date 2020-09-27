const mongoDb = require("mongoose");

var Schema = mongoDb.Schema,
  ObjectId = Schema.ObjectId;

const userCredentials = new mongoDb.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateRegistered: {
    type: Date
  },
});

const userSchema = mongoDb.model("userCredential", userCredentials);

module.exports = {userSchema };
