import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../../components/InfoBar/InfoBar.js";
import Input from "../../components/Input/Input.js";
import Messages from "../../components/Messages/Messages";
import OnlineUsers from "../../components/OnlineUsers/OnlineUsers";
import "./Chat.css";

const socket = io.connect("http://localhost:5000/"); // On development: "http://192.168.1.184:5000"

const getLocalStorage = () => {
  const messages = localStorage.getItem("messages");
  return messages ? JSON.parse(messages) : [];
  // if there is data saved in local storage, use it. otherwise use to default - []
};

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(getLocalStorage);
  const [users, setUsers] = useState("");
  const [showAllUsers, setShowAllUsers] = useState(false);

  useEffect(() => {
    const urlQueries = window.location.search; // returns the queries from the url: ?name=...&room=...
    const { name, room } = queryString.parse(urlQueries); // returns an object that contain the queries: {name: "...", room: "..."}
    setName(name);
    setRoom(room);
    socket.emit("join", { name: name, room: room });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
      console.log("nithul");
    });
    socket.on("usersInRoom", ({ users }) => {
      setUsers(users);
    });
  }, [messages, users]);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log(message);
    if (message) {
      console.log("emmitted");
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const smallScreen = window.innerWidth < 480;
  // media query for small screens is 480px max width

  return (
    <div className="outerContainer fade-in">
      <div
        className="container"
        style={{
          background:
            showAllUsers &&
            "linear-gradient(rgb(47, 125, 255) 0%, rgb(131, 96, 195) 100%)",
          height: showAllUsers && smallScreen && "100%",
        }}
      >
        <InfoBar
          room={room}
          users={users}
          showAllUsers={showAllUsers}
          setShowAllUsers={setShowAllUsers}
        />
        {showAllUsers ? (
          <OnlineUsers setShowAllUsers={setShowAllUsers} users={users} />
        ) : (
          <>
            <Messages messages={messages} name={name} users={users} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
