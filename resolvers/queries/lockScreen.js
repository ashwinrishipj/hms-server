const bcrypt = require('bcryptjs');
const {userSchema} = require('../../dBSchema/mongoDbSchema');

const lockScreenValidation = async (args) =>{
    console.log("---- Validating in db-----");
    console.log("user-emailId:", args.userId);
    
    const user = await userSchema.findById(args.userId);
    if (!user) {
      throw new Error("User Not found! please Register!");
    }
    console.log("resultant:", user);

    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }

    console.log("---- Validating in db has completed:-----");
    return true;
}

module.exports = {lockScreenValidation};