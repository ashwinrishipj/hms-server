const { insertTask, updateTask } = require('./mutation/mutateToDoList');
const registerUser = require('./mutation/registerUser');
const {authenticateUser} = require('./queries/authentication'); 
const {retrieveToDoList } = require('./queries/todoTasks');
const {retrieveAppointments } = require('./queries/appointments');
const {createAppointment, updateAppointmentDetails} = require('./mutation/mutateAppointments');

resolvers = {
    registerUser : async (args) =>{
        return registerUser(args);
    },
    validateUser : async(args) =>{
        return authenticateUser(args);
    },
    getTodoList : async(args) =>{
        return retrieveToDoList(args);
    },
    insertTask : async(args) =>{
        return insertTask(args);
    },
    updateTask : async(args) =>{
        return updateTask(args);
    },
    createAppointment : async(args) =>{
        return createAppointment(args);
    },
    getAppointmentDetails: async (args) =>{
        return retrieveAppointments(args);
    },
    modifyAppointment: async(args) =>{
        return updateAppointmentDetails(args);
    }
}

module.exports = {resolvers};