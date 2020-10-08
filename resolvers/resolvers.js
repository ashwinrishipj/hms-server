const { insertTask, updateCompletedTask } = require('./mutation/mutateToDoList');
const registerUser = require('./mutation/registerUser');
const {authenticateUser} = require('./queries/authentication'); 

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
    updateCompletedTask : async(args) =>{
        return updateCompletedTask(args);
    }
}

module.exports = {resolvers};