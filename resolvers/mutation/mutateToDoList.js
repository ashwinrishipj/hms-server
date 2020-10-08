const { toDoListSchema } = require('../../dBSchema/mongoDbSchema');

const insertTask = async (args) => {
	console.log('---- Inserting new Task to to-do-list -----');
    const taskDetails = {
        title: args.input.title,
        content: args.input.content,
        date: args.input.date,
    };

	const insertTask = await toDoListSchema.findOneAndUpdate({ userId: args.input.userId },{ $push: { tasks: taskDetails } },{new:true});
	if (!insertTask) {
		const userToDoList = new toDoListSchema({
			userId: args.input.userId,
			tasks: [taskDetails],
		});

		const insertToDoTask = await userToDoList.save();
		if (!insertToDoTask) {
			throw new Error('\n error in inserting to-do');
		}
		return insertToDoTask;
	}
	console.log('-----Insertion completed -----');
	return insertTask;
};

const updateCompletedTask = async (args) =>{
    console.log('---- Inserting completedTask List in a to-do-list -----');

    const deletingExistingTask = await toDoListSchema.findByIdAndUpdate(args.userId,{$pull: {"tasks" :{_id : args.id}}});
    if (!deletingExistingTask){
        console.log("error in deleting existing task:",deletingExistingTask);
    }
    console.log("task deleted",deletingExistingTask);
    const insertCompletedTask = await toDoListSchema.findByIdAndUpdate(args.userId,{ $push: {completed: deletingExistingTask } },{new:true});
    if (!insertCompletedTask){
        console.log("error in inserting completed task",insertCompletedTask);
    }
    console.log("result:",deletingExistingTask)
	return insertCompletedTask;
}

module.exports = { insertTask , updateCompletedTask};
