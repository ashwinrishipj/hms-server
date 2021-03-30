const { appointmentSchema, doctorAppointmentSchema } = require('../../dBSchema/mongoDbSchema');

const retrieveAppointments = async (args) => {
  console.log("---- To-do List searchin starts-----");
  console.log("user-Id:", args.userId);

  var provinceAppointments = await appointmentSchema.findOne({ userId: args.userId });
  if (!provinceAppointments) {
    throw new Error("User Not found! please Register!");
  }
  console.log("province appointments result:", provinceAppointments);

  var doctorAppointmentLists = await doctorAppointmentSchema.findOne({ userId: args.userId });
  if (!doctorAppointmentLists) {
    console.log("no doctor appointments have been made:")
    return provinceAppointments;
  }
  console.log("doctor appointment result:", doctorAppointmentLists);

  provinceAppointments["doctorAppointments"] = doctorAppointmentLists.appointments;
  console.log("Final Appointments:", provinceAppointments);
  console.log("---- Appointments searching has been completed:-----");
  return provinceAppointments;
}

module.exports = { retrieveAppointments };