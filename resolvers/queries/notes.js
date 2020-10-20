const {notesSchema} = require('../../dBSchema/mongoDbSchema');

const retrieveNotes  = async (args) =>{
    console.log("---- Notes searchin starts-----");
    console.log("user-Id:", args.userId);
    
    const user = await notesSchema.findOne({userId: args.userId});
    if (!user) {
      throw new Error("No notes found");
    }
    console.log("resultant:", user);
    console.log("---- notes searching has been completed:-----");
    return user;   
}

module.exports = {retrieveNotes};