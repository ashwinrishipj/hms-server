const registerUser = require('./mutation/registerUser');
const {authenticateUser} = require('./queries/authentication'); 

resolvers = {
    registerUser : async (args) =>{
        return registerUser(args);
    },
    validateUser : async(args) =>{
        return authenticateUser(args);
    }
}

module.exports = {resolvers};