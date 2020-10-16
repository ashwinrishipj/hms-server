const mongoDb = require('mongoose');

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
		type: Date,
	},
});

const todoList = new mongoDb.Schema({
	userId: {
		type: String,
	},
	tasks: [
		{
			title: { type: String },
			content: { type: String },
			date: { type: Date },
		},
	],
	completed: [
		{
			title: { type: String },
			content: { type: String },
			date: { type: Date },
		},
	],
	deleted: [
		{
			title: { type: String },
			content: { type: String },
			date: { type: Date },
		},
	],
});

const appointments = new mongoDb.Schema({
	userId: { type: String },
	appointments: [
		{
      name:{type: String},
      startDate: { type: String, unique: true },
      time:{type: String,unique:true},
      endDate: { type: String },
			title: { type: String },
			description: { type: String },
			hospital: {
				name : {type:String},
				description: {type: String},
				location: {type: String},
				phoneNumber:{type:String}
			},
      dept: { type: String },
      status : {type : String}
		},
	],
});

const notes = new mongoDb.Schema(
	{
		userId: { type: String },
		notes: [
			{
			notesContent: {type : String},
            date : {type : String},
			},   
		],
	}
)
const toDoListSchema = mongoDb.model('todoList', todoList);
const appointmentSchema = mongoDb.model('appointments', appointments);
const userSchema = mongoDb.model('userCredential', userCredentials);
const notesSchema = mongoDb.model('notes',notes)

module.exports = { userSchema, toDoListSchema,appointmentSchema,notesSchema};
