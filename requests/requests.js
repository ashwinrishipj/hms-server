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

    input hospitalDetails{
        name: String!,
        description: String!,
        location:String!,
        phoneNumber:String!
    }
    type hospitalDetailsResponse{
        name: String!,
        description: String!,
        location:String!,
        phoneNumber:String!
    }
    input appointmentDetails {
            userId: String!,
            name: String!,
            startDate:  String!,
            time: String!,
			phoneNumber: String!,
            description: String!,
			hospital: hospitalDetails!
            dept: String!
    }

    input updateAppointmentDetails{
            _id: ID,
            name: String!,
            startDate:String!,
            time:String!,
            dept:String!
    }

    type appointmentData {
        _id: ID!,
        startDate:  String!,
        name: String!
        time: String!,
        title: String,
        description: String,
        hospital: hospitalDetailsResponse!,
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

    type notesContent{
        _id : ID!,
        notesContent: String!,
        date : String!
    }
    
    type NoteCreatedResponse{
        userId: String!,
        notes: [notesContent],
    }
    type rootMutations{
        registerUser(input : userCredentials! ) : validated!
        insertTask(input : insertToDoTask! ) : todoResponse!
        updateTask(input : updateTask!) : todoResponse!
        createAppointment(input : appointmentDetails!) : Boolean!
        modifyAppointment(input: updateAppointmentDetails!) : Boolean!
        deleteAppointment(userId:String,_id: String!): Boolean!
        createNotes(userId:String!,notesContent:String!,date:String!) : NoteCreatedResponse!
    }

    schema {
        query : rootQuery,
        mutation : rootMutations
      }
    `
);
module.exports = { schema };
