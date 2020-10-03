const bcrypt = require('bcryptjs');
const {generateToken} = require('../helpers/generateToken');
const {userSchema} = require('../../dBSchema/mongoDbSchema');

const authenticateUser = async (args) =>{
    console.log("---- Validating in db-----");
    console.log("user-emailId:", args.input.emailId);
    
    const user = await userSchema.findOne({ emailId: args.input.emailId });
    if (!user) {
      throw new Error("User Not found! please Register!");
    }
    console.log("resultant:", user);

    const isEqual = await bcrypt.compare(args.input.password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }

    console.log("---- Validating in db has completed:-----");
    return generateToken(user.id, user.emailId);
}

module.exports = {authenticateUser};