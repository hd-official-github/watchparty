import { server } from "..";

import { Server } from "socket.io";
import { addUser, getCurrentUser } from "./users";

const soc = new Server(server, { cors: { origin: "*" } });

soc.on("connection", (socket) => {
  // console.log('CCE  ', socket);

  socket.on("joinroom", ({ name, room }) => {
    const user = addUser(socket.id, name, room); //add user to temp memory
    socket.join(user.room); //add user to room

    const payload = {
      message: `Welcome to chat ${name}`,
      client: { id: user.id, name: user.username },
    };
    //socket.emit("message", payload); //welcome current user
    socket.emit("welcome", payload); //welcome current user

    socket.broadcast
      .to(user.room)
      .emit("message", { ...payload, message: `${user.username} has joined` }); //broadcast to the room except current user
  });

  socket.on("chatMessage", (msg) => {
    // socket.emit("message", msg);
    const user = getCurrentUser(socket.id);
    const payload = {
      id: Math.random().toString(), // document/message id from database
      message: msg,
      client: { id: user.id, name: user.username },
    };
    socket.emit("message", payload); // might have to remove this & make both emits as one
    socket.broadcast.to(user.room).emit("message", payload);
  });
  socket.on("videoEvent", (videoEvent) => {
    console.log("videoEvent", videoEvent);
    // socket.emit("message", msg);
    const user = getCurrentUser(socket.id);
    const payload = {
      videoEvent,
      client: { id: user.id, name: user.username },
    };
    //socket.emit("message", payload); // might have to remove this & make both emits as one
    socket.broadcast.to(user.room).emit("videoEvent", payload);
  });

  socket.on("disconnect", () => {
    const user = getCurrentUser(socket.id);
    if (user) {
      const payload = {
        id: Math.random().toString(),
        message: `${user.username} left the chat`,
        client: { id: user.id, name: user.username },
      };
      soc.to(user.room).emit("message", payload);
    } else {
      soc.emit("message", { message: "Somebody left the chat" });
    }
  });
});
