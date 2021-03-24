const { doctorAppointmentSchema } = require('../../dBSchema/mongoDbSchema');

const createDoctorAppointment = async (args) => {
    console.log('------- inserting a new Appointment -------');
    console.log('\n \n user-Id:', args.input.userId);

    const appointmentDetails = {
        name: args.input.name,
        startDate: args.input.startDate,
        time: args.input.time,
        endDate: args.input.endDate,
        phoneNumber: args.input.phoneNumber,
        description: args.input.description,
        doctorDetails: {
            name: args.input.doctorDetails.name,
            qualification: args.input.doctorDetails.qualification,
            experience: args.input.doctorDetails.experience,
            workingOn: args.input.doctorDetails.workingOn,
            description: args.input.doctorDetails.description,
            contactDetails: args.input.doctorDetails.contactDetails,
        },
        status: 'pending',
    };

    var insertAppointment = await doctorAppointmentSchema.findOneAndUpdate(
        { userId: args.input.userId },
        { $push: { appointments: appointmentDetails } },
        { new: true }
    );
    if (!insertAppointment) {
        const appointments = new doctorAppointmentSchema({
            userId: args.input.userId,
            appointments: [appointmentDetails],
        });

        insertAppointment = await appointments.save();
        if (!insertAppointment) {
            throw new Error('\n error in inserting to-do',insertAppointment);
        }
        console.log('-----Insertion completed -----');
        return 1;
    }
    console.log("eror:", insertAppointment);
    console.log('-----Insertion completed -----');
    return 1;
};

module.exports = {createDoctorAppointment};