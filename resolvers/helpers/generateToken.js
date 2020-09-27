const jwt = require('jsonwebtoken');

const generateToken = (userID, userEmail) => {
  const token = jwt.sign(
    { userID: userID, emailId: userEmail },
    "superPrivateKey",
    { expiresIn: "5h" }
  );
  return { token: token, tokenExpiration: 1 };
};

module.exports = { generateToken };
