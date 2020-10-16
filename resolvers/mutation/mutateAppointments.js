const { appointmentSchema } = require('../../dBSchema/mongoDbSchema');

const createAppointment = async (args) => {
	console.log('------- inserting a new Appointment -------');
	console.log('\n \n user-Id:', args.input.userId);

	const appointmentDetails = {
		name: args.input.name,
		startDate: args.input.startDate,
		time: args.input.time,
		endDate: args.input.endDate,
		phoneNumber: args.input.phoneNumber,
		description: args.input.description,
		hospital: {
			name: args.input.hospital.name,
            description: args.input.hospital.description,
            location: args.input.hospital.location,
            phoneNumber: args.input.hospital.phoneNumber,
		},
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
    console.log("eror:",insertAppointment);
	console.log('-----Insertion completed -----');
	return 1;
};

const updateAppointmentDetails = async (args) => {
	console.log('------- updating a new Appointment -------');

	const response = await appointmentSchema.findOneAndUpdate(
		{ "appointments._id": args.input._id },
		{$set: {
				'appointments.$.startDate': args.input.startDate,
				'appointments.$.time': args.input.time,
				'appointments.$.dept': args.input.dept,
				'appointments.hospital.name' : args.input.hospital.hospitalName,
				'appointments.hospital.description': args.input.hospital.description,
				'appointments.hospital.location': args.input.hospital.location,
				'appointments.hospital.phoneNumber': args.input.hospital.phoneNumber
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

const deleteAppointment = async (args)=>{
	console.log("-------- deleting an appointment");
	const response = await appointmentSchema.findOneAndUpdate({"userId":args.userId},{$pull: {appointments :{"_id ": args._id}}});

	if (!response) {
		console.log('error', response);
		throw new Error(response);
	} else {
		console.log('response', response);
		return 1;
	}
}
module.exports = { createAppointment, updateAppointmentDetails,deleteAppointment };
