const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { cors: 
                                   {origin:"http://localhost:3000",
                                    methods: ["GET", "POST"]
                                   } 
                                  });

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
