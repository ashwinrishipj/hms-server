const {toDoListSchema} = require('../../dBSchema/mongoDbSchema');

const retrieveToDoList  = async (args) =>{
    console.log("---- To-do List searchin starts-----");
    console.log("user-Id:", args.userId);
    
    const user = await toDoListSchema.findOne({userId: args.userId});
    console.log("resultant:", user);
    console.log("---- To-do-List searching has been completed:-----");
    return user;
    
}

module.exports = {retrieveToDoList};