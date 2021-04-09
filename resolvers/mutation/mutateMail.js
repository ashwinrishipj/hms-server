const { mailSchema } = require('../../dBSchema/mongoDbSchema');

const sendMail = async (args) => {
    console.log('------- inserting a new mail -------');
    console.log('\n \n user-Id:', args.input._id);

    const mailDetails = {
        emailId: args.input.sent[0].emailId,
        date: args.input.sent[0].date,
        subject: args.input.sent[0].subject,
        content: args.input.sent[0].content,
    };

    console.log("\n \n mailDetails",mailDetails);

    var insertMail = await mailSchema.findOneAndUpdate(
        { emailId: args.input.emailId },
        { $push: { sent: mailDetails } },
        { new: true }
    );
    
    console.log("\n \n insertMAil",insertMail);

    if (!insertMail) {
        const insertNewMail = new mailSchema({
            emailId: args.input.emailId,
            sent: [mailDetails],
        });

        insertedMail = await insertNewMail.save();
        if (!insertedMail) {
            throw new Error('\n \n error in inserting new doctor appointents', insertAppointment);
        }
        else {
            console.log("\n \n calling receiver");
            return updateReceiverInbox(args.input.emailId, mailDetails);
        }
    }
    else {
        console.log("calling receiver");
        return updateReceiverInbox(args.input.emailId, mailDetails);
    }
};

const updateReceiverInbox = async (from, data) => {
    console.log("inside receiver");
    const receiverMailDetails = {
        emailId: from,
        date: data.date,
        subject: data.subject,
        content: data.content,
    };

    console.log("receiver mail Box",receiverMailDetails);

    var insertMail = await mailSchema.findOneAndUpdate(
        { emailId: data.emailId },
        { $push: { inbox: receiverMailDetails } },
        { new: true }
    );

    if (!insertMail) {
        const insertNewMail = new mailSchema({
            emailId: data.emailId,
            inbox: [receiverMailDetails],
        });

        insertedMail = await insertNewMail.save();

        if (!insertedMail) {
            throw new Error('\n error in inserting new doctor appointents', insertedMail);
        }
        console.log("\n \n ---- inserted Mail details:",insertedMail);
        console.log("\n \n ----- insertion in receiver inbox completed:");
        return 1;
    }
    console.log("\n \n ----- insertion in receiver inbox completed:");
    return 1;

};
module.exports = { sendMail };