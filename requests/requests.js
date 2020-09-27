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

    type rootQuery{
        validateUser(input : userCredentials!) : validated!
    }

    type rootMutations{
        registerUser(input : userCredentials! ) : validated!
    }
    schema {
        query : rootQuery,
        mutation : rootMutations
      }
    `
);
module.exports = {schema}