import { Button, Card, TextField } from "@mui/material";
import "./chat.scss";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Redirect, useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
// import VideoBox from "../components/VideoBox";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
let socket,
  allMessages = [];
const ENDPOINT = "http://localhost:8000";
export default function Chat({ history }) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  // const input = useRef(null);
  const videoRef = React.useRef(null);
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

      socket = io.connect(ENDPOINT);
      //join room  on page load
      socket.emit("joinroom", { name, room });

      //when current user reiceves message
      socket.on("welcome", (payload) => {
        console.log({ payload });
        setUser(payload.client);
        onMessage(payload);
      });
      socket.on("messagereciever", onMessage);
      socket.on("videoEvent", onVideoEvent);
    }

    // const events = ["play", "seeked", "pause"];
    const events = ["play", "pause"];
    const videoElm = videoRef.current;
    events.map((e) => {
      videoElm.addEventListener(e, () => updateEvent(e));
    });

    return () => {
      socket.disconnect();
      events.map((e) => {
        videoElm.removeEventListener(e, () => updateEvent(e));
      });
    };
  }, []);

  const onMessage = (data) => {
    console.log("MSG RECIEVED ", data, messages);
    addMessage({
      // id: Math.random().toString(),
      id: data.id,
      message: data.message,
      user: data.client.name,
    });
  };
  const addMessage = (data) => {
    console.log({ messages, data });
    allMessages.push(data);
    // setMessages(allMessages.slice(-100));
    setMessages([...allMessages]);
  };
  const hSendMessage = (e) => {
    // console.log({ ...e });
    e.preventDefault();
    // const message = input.current.value;
    // input.current.value = "";

    const message = e.target[0].value;
    // console.log({ message });
    if (message) {
      e.target[0].value = "";
      socket.emit("chatMessage", message);
    }
  };
  const onVideoEvent = ({ videoEvent, client }) => {
    console.log({ videoEvent, client });
    const videoElm = videoRef.current;
    videoElm.currentTime = videoEvent.currentTime;
    switch (videoEvent.event) {
      case "play":
        videoElm.play();
        break;
      case "seeked":
        // videoElm.currentTime = videoEvent.currentTime;
        break;
      case "pause":
        videoElm.pause();
        break;
      default:
    }
  };

  const updateEvent = (event) => {
    const {
      duration,
      playing,
      currentTime,
      src,
      currentSrc,
      muted,
      paused,
      volume,
      // } = ref.current;
    } = videoRef.current;
    const eventObject = {
      event,
      duration,
      playing,
      currentTime,
      src,
      currentSrc,
      muted,
      paused,
      volume,
    };
    console.log(eventObject);
    socket.emit("videoEvent", eventObject);
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
        <div className="flex jc-stretch">
          {/* <VideoBox ref={videoRef} onChange={hVideoChange} /> */}
          <div className="videobox ">
            <video
              ref={videoRef}
              // ref={ref}
              // {...events}
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
            ></video>
          </div>
          <div className="chatbox ">
            <div className="messages flex col jc-end mb-1">
              {messages.map((m, index) => (
                <span
                  key={index}
                  className={m.user?.id == user?.id ? "right" : "left"}
                >
                  {m.message}
                </span>
              ))}
            </div>
            <form className="input flex" onSubmit={hSendMessage}>
              <TextField
                // id="standard-basic"
                // inputRef={input}
                fullWidth
                label="Type Message"
                variant="standard"
                name="message"
              />
              <Button variant="contained" type="submit">
                Send&nbsp;
                <SendIcon fontSize="small" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
