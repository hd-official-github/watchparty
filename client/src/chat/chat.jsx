import { Button, Card } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Redirect, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Chat({ history }) {
  const [cHat, setcHat] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  let query = useQuery();
  const socketRef = useRef();

  useEffect(() => {
    if (!query.get("name") || !query.get("room")) {
      history.replace("/");
    } else {
      setName(query.get("name"));
      setRoom(query.get("room"));
    }
    try {
      socketRef.current = io.connect("http://localhost:8000");
      // socketRef.current.emit('message', "hello")
      socketRef.current.on("message", (data) => {
        console.log("D ", data);
      });

      socketRef.current.emit("chatMessage", query.get("name"));
    } catch (err) {
      console.log("SOCKET ERR ", err.message);
    }
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <>
      {/* <nav></nav> */}
      <main className="flex">
        <div>
          <h1>{room},</h1>
          <h2>Hii, {name} 👋</h2>
        </div>
        <div className="space"></div>
        <Button onClick={() => history.push("/")} variant="outlined">
          Logout
        </Button>
      </main>
    </>
  );
}
