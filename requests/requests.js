var { buildSchema } = require('graphql');

const schema = buildSchema(
	`
    type validated{
        token : String!,
        tokenExpiration : Int!
    }

    input userCredentials{
        emailId : String!,
        password : String!,
        dateRegistered : String
    }

    input insertToDoTask{
        userId: String!,
        title: String,
        content: String!,
        date: String!
    }

    type taskData{
        _id: ID,
        title: String,
        content: String,
        date: String
    }

    input updateTask{
        userId: String!,
        id: String!,
        title: String,
        content: String,
        date: String,
        updateTo: String!,
        from: String!
    }

    input appointmentDetails {
            userId: String!,
            name: String!,
            startDate:  String!,
            time: String!,
			endDate: String,
			title: String,
			description: String,
			hospital: String!,
			dept: String!
    }

    input updateAppointmentDetails{
            _id: ID,
            name: String!,
            startDate:String!,
            time:String!,
            endDate:String!,
            dept:String!
    }

    type appointmentData {
        _id: ID!,
        startDate:  String!,
        time: String!,
        endDate: String ,
        title: String,
        description: String,
        hospital: String,
        dept: String,
        status:String!
    }

    type getAppointmentDetails {
        userId: String!,
        appointments:[appointmentData]
    }

    type todoResponse{
        userId: String!,
        tasks: [taskData]
        completed : [taskData],
        deleted : [taskData]
    }

    type rootQuery{
        validateUser(input : userCredentials!) : validated!
        getTodoList(userId : String!) : todoResponse!
        getAppointmentDetails(userId: String!) : getAppointmentDetails!
    }

    type rootMutations{
        registerUser(input : userCredentials! ) : validated!
        insertTask(input : insertToDoTask! ) : todoResponse!
        updateTask(input : updateTask!) : todoResponse!
        createAppointment(input : appointmentDetails!) : Boolean!
        modifyAppointment(input: updateAppointmentDetails!) : Boolean!
    }

    schema {
        query : rootQuery,
        mutation : rootMutations
      }
    `
);
module.exports = { schema };
