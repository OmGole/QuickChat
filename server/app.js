const { createServer } = require("http");
const express = require('express');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 
  {origin:"*",
   methods: ["GET", "POST"]
  } 
 });

app.use(cors());


io.on("connection", (socket) => {

  socket.on("joinRoom",({name,roomId}) => {
    socket.join(roomId);
    io.to(roomId).emit("join",`${name} joined the room`);
  })

  socket.on("message",(message) => {
    console.log(message);
    io.to(message.roomId).emit("message",message);
  });

  socket.on("leave",({name,roomId}) => {
    io.to(roomId).emit("left",`${name} left the room`);
  })
  
});

httpServer.listen(5000,() => console.log('Server Listening ......'));
