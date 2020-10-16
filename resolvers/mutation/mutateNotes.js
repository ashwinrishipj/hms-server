const { notesSchema } = require('../../dBSchema/mongoDbSchema');

const createNotes = async (args) => {
	console.log('------- inserting a new Notes -------');
	console.log('\n \n user-Id:', args.userId);

	const noteDetails = {
		notesContent: args.notesContent,
		date: args.date,
	};

	var insertNotes = await notesSchema.findOneAndUpdate(
		{ userId: args.userId },
		{ $push: { notes: noteDetails } },
		{ new: true }
	);
	if (!insertNotes) {
		const notes = new notesSchema({
			userId: args.userId,
			notes: [noteDetails],
		});

		let insertNotes = await notes.save();
		if (!insertNotes) {
			throw new Error('\n error in inserting notes');
		}
		console.log("inserted notes", insertNotes);
		return insertNotes;
	}
	console.log("insertNotes-2", insertNotes);
	return insertNotes;
};

module.exports = { createNotes };