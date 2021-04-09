var { buildSchema } = require('graphql');

const schema = buildSchema(
    `
    type validated{
        token : String!,
        tokenExpiration : Int!,
        userId :String
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
    input doctorData {
                name:String!,
				qualification:String!,
				experience:String!,
				workingOn:String!,
				description:String!,
				contactDetails:String!
    }
    input doctorAppointmentDetails {
        userId: String!,
        name: String!,
        startDate:  String!,
        time: String!,
        phoneNumber: String!,
        description: String!,
        doctorDetails: doctorData!
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
    
    type mutateContentData{
        emailId:String,
        date:String,
        subject:String,
        content:String
    }

    type fetchMailData{
        emailId : String!,
        inbox:[mutateContentData],
        sent:[mutateContentData],
        starred:[mutateContentData],
        deleted:[mutateContentData],
        social:[mutateContentData]
    }

    type doctorDetails {
        name:String,
        qualification:String,
        experience:String,
        workingOn:String,
        description:String,
        contactDetails:String
    }
    type doctorAppointmentData{
        name: String,
        startDate:  String,
        time: String,
        description: String,
        doctorDetails: doctorDetails
    }
    type hospitalDetailsResponse{
        name: String!,
        description: String!,
        location:String!,
        phoneNumber:String!
    }
    type getAppointmentDetails {
        userId: String!,
        appointments:[appointmentData],
        doctorAppointments:[doctorAppointmentData]
    }

    type todoResponse{
        userId: String!,
        tasks: [taskData]
        completed : [taskData],
        deleted : [taskData]
    }

    type taskData{
        _id: ID,
        title: String,
        content: String,
        date: String!,
    }
    type notesContent{
        _id : ID!,
        notesContent: String!,
        date : String!
    }
    input mailContentData{
        emailId:String,
        date:String,
        subject:String,
        content:String
    }
    input sendMailData{
        emailId : String!, 
        sent:[mailContentData],
    }
    type NotesResponse{
        userId: String!,
        notes: [notesContent],
    }
    input forgetPassword{
        emailId: String!,
        verification: String
    }
    type rootQuery{
        validateUser(input : userCredentials!) : validated!
        getTodoList(userId : String!) : todoResponse
        getAppointmentDetails(userId: String!) : getAppointmentDetails!
        getNotesDetails(userId: String): NotesResponse
        lockScreenValidation(userId:String!,password:String!) : Boolean!
        resetPassword(input: forgetPassword): Boolean
        getMailData(emailId: String!) : fetchMailData!
    }
    type rootMutations{
        registerUser(input : userCredentials! ) : validated!
        insertTask(input : insertToDoTask! ) : todoResponse!
        updateTask(input : updateTask!) : todoResponse!
        createAppointment(input : appointmentDetails!) : Boolean!
        createDoctorAppointment(input : doctorAppointmentDetails!) : Boolean!
        modifyAppointment(input: updateAppointmentDetails!) : Boolean!
        deleteAppointment(userId:String,_id: String!): Boolean!
        createNotes(userId:String!,notesContent:String!,date:String!) : NotesResponse!
        sendMail(input:sendMailData) : Boolean!
    }

    schema {
        query : rootQuery,
        mutation : rootMutations
      }
    `
);
module.exports = { schema };
