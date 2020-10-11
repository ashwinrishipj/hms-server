const { appointmentSchema } = require('../../dBSchema/mongoDbSchema');

const createAppointment = async (args) => {
	console.log('------- inserting a new Appointment -------');
	console.log('\n \n user-Id:', args.input.userId);

	const appointmentDetails = {
		name: args.input.name,
		startDate: args.input.startDate,
		time: args.input.time,
		endDate: args.input.endDate,
		title: args.input.title,
		description: args.input.description,
		hospital: args.input.hospital,
		dept: args.input.dept,
		status: 'pending',
	};

	var insertAppointment = await appointmentSchema.findOneAndUpdate(
		{ userId: args.input.userId },
		{ $push: { appointments: appointmentDetails } },
		{ new: true }
	);
	if (!insertAppointment) {
		const appointments = new appointmentSchema({
			userId: args.input.userId,
			appointments: [appointmentDetails],
		});

		insertAppointment = await appointments.save();
		if (!insertAppointment) {
			throw new Error('\n error in inserting to-do');
		}
		return 1;
	}
	console.log('-----Insertion completed -----');
	return 0;
};

const updateAppointmentDetails = async (args) => {
	console.log('------- updating a new Appointment -------');

	const response = await appointmentSchema.findOneAndUpdate(
		{ 'appointments._id': args.input._id },
		{$set: {
				'appointments.$.name': args.input.name,
				'appointments.$.startDate': args.input.startDate,
				'appointments.$.time': args.input.time,
				'appointments.$.endDate': args.input.endDate,
				'appointments.$.dept': args.input.dept,
			},
		},
		{ new: true }
	);

	if (!response) {
		console.log('error', response);
		throw new Error(response);
	} else {
		console.log('response', response);
		return 1;
	}
};
module.exports = { createAppointment, updateAppointmentDetails };
