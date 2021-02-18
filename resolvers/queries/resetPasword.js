var nodemailer = require('nodemailer');
const { userSchema } = require('../../dBSchema/mongoDbSchema');

const saveTokenToUser = async (args, otp) => {
    userSchema.findOneAndUpdate({ emailId: args.input.emailId }, { $set: { otp: otp } }, { new: true }).then(response => {
        console.log("OTP updated sucessfully", response)
    }).catch(err => {
        console.log(err);
    });
}

const resetPassword = async (args) => {
    if (args.input.verfication) {
        const user = await userSchema.findOne({ emailId: args.input.emailId, otp: args.input.verification });
        if (!user) {
            console.log(user);
            return false;
        } else {
            return true;
        }
    } else {
        console.log("---- Validating in db-----");
        console.log("user-emailId:", args.input.emailId);

        const user = await userSchema.findOne({ emailId: args.input.emailId });
        if (!user) {
            throw new Error("User Not found! please Register!");
        }
        else {
            var otp = Math.floor(100000 + Math.random() * 900000);
            otp = otp.toString();

            console.log("resultant:", user);

            const transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "picsplaydevelopers@gmail.com",
                    pass: "Dumbledore100#"
                }
            });

            console.log("\n transporter:", transporter);
            var otp = Math.floor(100000 + Math.random() * 900000);
            otp = otp.toString();

            const mailOptions = {
                from: '"picsplayDevelopers" <picsplaydevelopers@gmail.com>',
                to: args.input.emailId,
                subject: "reset password from HMS",
                html: "<h3> OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
            };

            console.log("mailOptions:", mailOptions);
            try {
                const information = await transporter.sendMail(mailOptions);
                if (information) {
                    saveTokenToUser(args, otp);
                    return true;
                } return false;
            }
            catch (error) {
                console.log("error in node mailer:", error);
            }
        }
    }
}
module.exports = { resetPassword };