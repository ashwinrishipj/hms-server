const { resolvers } = require("./resolvers/resolvers");
const { graphqlHTTP } = require('express-graphql');
const { schema } = require("./requests/requests");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb://rishi:Dumbledore@cluster0-shard-00-00-3l7u9.mongodb.net:27017,cluster0-shard-00-01-3l7u9.mongodb.net:27017,cluster0-shard-00-02-3l7u9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    app.listen(4000);
    console.log("Server is live:");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
