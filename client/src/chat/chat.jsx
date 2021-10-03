import { Button, Card } from "@mui/material";
import "./chat.scss";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Redirect, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
let socket,
  allMessages = [];
const ENDPOINT = "http://localhost:8000";
export default function Chat({ history }) {
  const [cHat, setcHat] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [messages, setMessages] = useState([]);

  let query = useQuery();
  // const socketRef = useRef();

  useEffect(() => {
    const [name, room] = [query.get("name"), query.get("room")];
    if (!name || !room) {
      history.replace("/");
    } else {
      setName(name);
      setRoom(room);
      // try {
      socket = io.connect(ENDPOINT);
      // socket.emit('message', "hello")
      socket.on("message", onMessage);

      socket.emit("chatMessage", name);
      // } catch (err) {
      //   console.log("SOCKET ERR ", err.message);
      // }
    }
    return () => socket.disconnect();
  }, []);
  const onMessage = (data) => {
    console.log("D ", data, messages);
    addMessage({ id: Math.random().toString(), message: data });
  };
  const addMessage = (data) => {
    console.log({ messages });
    allMessages.push(data);
    setMessages(allMessages.slice(-100));
  };
  return (
    <>
      <main className="chat">
        <nav className="flex">
          <div>
            <h1>{room},</h1>
            <h2>Hii, {name} 👋</h2>
          </div>
          <div className="space"></div>
          <Button onClick={() => history.push("/")} variant="outlined">
            Logout
          </Button>
        </nav>
        <div className="messages flex col">
          {messages.map((m) => (
            <span key={m.id} className="left">
              {m.message}
            </span>
          ))}
        </div>
      </main>
    </>
  );
}
