const { insertTask, updateTask } = require('./mutation/mutateToDoList');
const registerUser = require('./mutation/registerUser');
const {authenticateUser} = require('./queries/authentication'); 
const { retrieveToDoList } = require('./queries/todoTasks');

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
    }
}

module.exports = {resolvers};