const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
  },
});

// convert from heroku's server time zone to israel's time zone (GMT0 -> GMT+3)
const herokuToIsraelTimeZone = (hours) => {
  return hours === 21 ? 0 : hours === 22 ? 1 : hours === 23 ? 2 : hours + 3;
};

io.on("connection", (socket) => {
  // the "socket" object is being sent from the client every time a we do 'socket.emit'

  socket.once("join", ({ name, room }) => {
    // we're using socket.once instead of socket.on to prevent multiple request form the same user

    const newUser = addUser({ id: socket.id, name, room });
    // console.log([newUser, "fense"]);

    const date = new Date();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const time = `${herokuToIsraelTimeZone(date.getHours())}:${minutes}`;
    socket.emit("message", {
      user: "Admin",
      text: `Hello ${newUser?.name}, Welcome to room ${newUser?.room}`,
      time: time,
    });
    socket.broadcast.to(newUser?.room).emit("message", {
      user: "Admin",
      text: `${newUser?.name} has joined!`,
      time: time,
    });
    // send a message to all members in the room
    socket.join(newUser?.room);
    io.to(newUser?.room).emit("usersInRoom", {
      room: newUser?.room,
      users: getUsersInRoom(newUser?.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    // console.log("server got message:", message); // Add a log to check if the server received the message
    const user = getUser(socket.id);
    console.log("user:", user); // Log the user object to check if it's retrieved successfully
    if (user) {
      const date = new Date();
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const time = `${herokuToIsraelTimeZone(date.getHours())}:${minutes}`;

      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
        time: time,
      });

      callback();
    }
  });

  // get called from the client using 'socket.disconnect()'
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      const date = new Date();
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const time = `${herokuToIsraelTimeZone(date.getHours())}:${minutes}`;
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
        time: time,
      });
      io.to(user.room).emit("usersInRoom", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

//? ----------------------------- While in production: -----------------------------

const dirName = __dirname.slice(0, -7);
app.use(express.static(path.join(dirName, "/client/build")));
// '*' - any route that is not declared in the api routes
console.log(path.join(dirName, "/client/build"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(dirName, "client", "build", "index.html"))
);
// ? ----------------------------- End - While in production: -----------------------------

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
