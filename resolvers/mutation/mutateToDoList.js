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

const updateTask = async (args) =>{
    console.log('---- Inserting completedTask List in a to-do-list -----');

    const taskDetails = {
        title: args.input.title,
        content: args.input.content,
        date: args.input.date,
    };

    var insertCollectionName = args.input.updateTo;
    var deleteCollectionName = args.input.from;
    var deletingExistingTask,insertCompletedTask;

    if (deleteCollectionName == "completed") 
     deletingExistingTask = await toDoListSchema.findOneAndUpdate({"userId":args.input.userId},{$pull: {completed :{_id : args.input.id}}});
    else
     deletingExistingTask = await toDoListSchema.findOneAndUpdate({"userId":args.input.userId},{$pull: {tasks :{_id : args.input.id}}});
    
    if (!deletingExistingTask){
        console.log("error in deleting existing task:",deletingExistingTask);
    }

    if (insertCollectionName == "deleted")
     insertCompletedTask = await toDoListSchema.findOneAndUpdate({"userId" : args.input.userId},{ $push: {deleted : taskDetails } },{new:true});
    else
     insertCompletedTask = await toDoListSchema.findOneAndUpdate({"userId" : args.input.userId},{ $push: {completed : taskDetails } },{new:true});
   
    if (!insertCompletedTask){
        console.log("error in inserting completed task",insertCompletedTask);
    }
	return insertCompletedTask;
}

module.exports = { insertTask , updateTask};
