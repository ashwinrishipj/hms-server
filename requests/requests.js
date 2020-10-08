var {buildSchema} = require('graphql');

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

    type todoResponse{
        userId: String!,
        tasks: [taskData]
        completed : [taskData],
        deleted : [taskData]
    }

    type rootQuery{
        validateUser(input : userCredentials!) : validated!
        getTodoList(userId : String!) : todoResponse!
    }

    type rootMutations{
        registerUser(input : userCredentials! ) : validated!
        insertTask(input : insertToDoTask! ) : todoResponse!
        updateCompletedTask(userId: ID!, id: ID!) : todoResponse!
    }

    schema {
        query : rootQuery,
        mutation : rootMutations
      }
    `
);
module.exports = {schema}