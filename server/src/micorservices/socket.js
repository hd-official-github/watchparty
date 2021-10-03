import { server } from "..";

import { Server } from "socket.io";
import { addUser, getCurrentUser } from "./users";

const soc = new Server(server, { cors: { origin: "*" } });

soc.on("connection", (socket) => {
  // console.log('CCE  ', socket);

  socket.on('joinroom', ({ name, room }) => {
    socket.emit('message', `Welcome to chat ${name}`)  //welcome current user

    const user = addUser(socket.id, name, room)  //add user to temp memory
    socket.join(user.room) //add user to room

    socket.broadcast.to(user.room).emit('message', `${user.username} has joined`)  //broadcast to the room except current user
  });


  // socket.on("chatMessage", (msg) => {
  //   soc.emit("message", `${msg} joined the chat`);
  // });

  socket.on("disconnect", () => {
    const user = getCurrentUser(socket.id);
    if (user) {
      soc.to(user.room).emit("message", `${user.username} left the chat`);
    } else {
      soc.emit('message', 'Somebody left the chat')
    }
  });
});
