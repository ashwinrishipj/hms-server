const {authenticateUser} = require('./queries/authentication'); 

resolvers = {
    registerUser : async (args) =>{
        return 0;
    },
    validateUser : async(args) =>{
        return authenticateUser(args);
    }
}

module.exports = {resolvers};