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

const todoList = new mongoDb.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    tasks: [
      {
        title: {type : String},
        content: {type : String},
        date: {type : Date}
      }
    ],
    completed: [
      {
        title: {type : String},
        content: {type : String},
        date: {type : Date}
      }
    ],
    deleted: [
      {
        title: {type : String},
        content: {type : String},
        date: {type : Date}
      }
    ]
  }
)

const toDoListSchema = mongoDb.model("todoList", todoList);
module.exports = {userSchema,toDoListSchema };
