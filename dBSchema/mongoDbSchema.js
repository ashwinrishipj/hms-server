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
	otp: {
		type: String
	}
});

const todoList = new mongoDb.Schema({
	userId: {
		type: String,
	},
	tasks: [
		{
			title: { type: String },
			content: { type: String },
			date: { type: String },
		},
	],
	completed: [
		{
			title: { type: String },
			content: { type: String },
			date: { type: String },
		},
	],
	deleted: [
		{
			title: { type: String },
			content: { type: String },
			date: { type: String },
		},
	],
});

const appointments = new mongoDb.Schema({
	userId: { type: String },
	appointments: [
		{
			name: { type: String },
			startDate: { type: String },
			time: { type: String, unique: true },
			endDate: { type: String },
			title: { type: String },
			description: { type: String },
			hospital: {
				name: { type: String },
				description: { type: String },
				location: { type: String },
				phoneNumber: { type: String }
			},
			dept: { type: String },
			status: { type: String }
		},
	],
});

const doctorAppointments = new mongoDb.Schema({
	userId: { type: String },
	appointments: [
		{
			name: { type: String },
			startDate: { type: String },
			time: { type: String, unique: true },
			endDate: { type: String },
			title: { type: String },
			description: { type: String },
			doctorDetails: {
				name: { type: String },
				qualification: { type: String },
				experience: { type: String },
				workingOn: { type: String },
				description: { type: String },
				contactDetails: { type: String },
			},
			status: { type: String }
		},
	],
});

const notes = new mongoDb.Schema(
	{
		userId: { type: String },
		notes: [
			{
				notesContent: { type: String },
				date: { type: String },
			},
		],
	}
);

const mails = new mongoDb.Schema(
	{
		emailId: {type:String},
		inbox: [{
			emailId: {
				type: String,
			},
			subject: {
				type: String,
			},
			content: {
				type: String,
			},
			date: {
				type: String,
			},
		}],
		sent: [{
			emailId: {
				type: String,
			},
			subject: {
				type: String,
			},
			content: {
				type: String,
			},
			date: {
				type: String,
			},
		}],
		starred: [{
			emailId: {
				type: String,
			},
			subject: {
				type: String,
			},
			content: {
				type: String,
			},
			date: {
				type: String,
			},
		}],
		deleted: [{
			emailId: {
				type: String,
			},
			subject: {
				type: String,
			},
			content: {
				type: String,
			},
			date: {
				type: String,
			},
		}],
		social: [{
			emailId: {
				type: String,
			},
			subject: {
				type: String,
			},
			content: {
				type: String,
			},
			date: {
				type: String,
			},
		}],
	}
);

const toDoListSchema = mongoDb.model('todoList', todoList);
const appointmentSchema = mongoDb.model('appointments', appointments);
const userSchema = mongoDb.model('userCredential', userCredentials);
const notesSchema = mongoDb.model('notes', notes)
const doctorAppointmentSchema = mongoDb.model('doctorAppointments', doctorAppointments)
const mailSchema = mongoDb.model('mailData', mails);

module.exports = { userSchema, toDoListSchema, appointmentSchema, notesSchema, doctorAppointmentSchema, mailSchema };
