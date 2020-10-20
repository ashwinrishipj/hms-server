const bcrypt = require('bcryptjs');
const {userSchema} = require('../../dBSchema/mongoDbSchema');
const {generateToken} = require('../helpers/generateToken');

const registerUser = async (args) =>{

  return userSchema
  .findOne({ emailId: args.input.emailId })
  .then((user) => {
    if (user != null) {
      throw new Error("user already exists!. please Login.");
    }
    return bcrypt.hash(args.input.password, 12);
  })
  .then((hashedPassword) => {
    let date = new Date();
    const user = new userSchema({
      emailId: args.input.emailId,
      password: hashedPassword,
      dateRegistered: date,
    });
    return user.save();
  })
  .then((result) => {
    if (result !== null) {
      console.log(`${args.input.emailId}` + "created", result.id);
      return generateToken(result.id, result.emailId);
    }
    throw new Error("insertion in Db failed:");
  })
  .catch((err) => {
    throw err;
  });
}

module.exports = {registerUser};