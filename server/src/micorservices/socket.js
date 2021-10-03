import { server } from "..";

import { Server } from "socket.io";

const soc = new Server(server, { cors: { origin: "*" } });

soc.on("connection", (socket) => {
  // console.log('CCE  ', socket);

  // socket.emit('message', 'hi');

  // socket.broadcast.emit('message', 'A user has joined')

  socket.on("chatMessage", (msg) => {
    soc.emit("message", `${msg} joined the chat`);
  });

  socket.on("disconnect", () => {
    soc.emit("message", "User left the chat");
  });
});
