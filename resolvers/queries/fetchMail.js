const {mailSchema} = require("../../dBSchema/mongoDbSchema");

const fetchMail = async (args)=>{
    console.log("---- Fetching Mail starts-----");
    console.log("email-Id:", args.emailId);
    
    const user = await mailSchema.findOne({emailId: args.emailId});
    if (!user) {
      throw new Error("No data found");
    }
    console.log("resultant:", user);
    console.log("---- mail searching has been completed:-----");
    return user;   
}

module.exports = {fetchMail};