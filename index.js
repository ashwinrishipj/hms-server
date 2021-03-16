const { resolvers } = require("./resolvers/resolvers");
const { graphqlHTTP } = require('express-graphql');
const { schema } = require("./requests/requests");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const port = 4000;

const app = require('express')();
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

mongoose
  .connect(
    `mongodb://rishi:Dumbledore@cluster0-shard-00-00-3l7u9.mongodb.net:27017,cluster0-shard-00-01-3l7u9.mongodb.net:27017,cluster0-shard-00-02-3l7u9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    server.listen(port);
    console.log("Server is live:");
  })
  .catch((err) => {
    console.log(err);
  });

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  console.log("rommId:",roomId)

  // Listen for new messages
  socket.on("newChatMessage", (data) => {
    io.in(roomId).emit("newChatMessage", data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
