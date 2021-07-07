require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/admin/error");
const ADMIN = "/";

app.use(cors());
app.options("*", cors());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(ADMIN, adminRoutes);
app.use(errorController.get404);

const activeUsers = new Set();
let roomId = "";

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.on("room", function (room) {
    roomId = room;
    socket.join(room);
  });

  socket.on("new user", (data) => {
    console.log("data user", data);
    socket.userId = data;
    activeUsers.add(data);
    io.to(roomId).emit("new user", [...activeUsers]);
  });

  socket.on("chat message", (msg) => {
    console.log("msg => ", msg);
    io.to(roomId).emit("chat message", msg);
  });

  socket.on("typing", (data) => {
    console.log("data typing", data);
    socket.broadcast.to(roomId).emit("typing", data);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.to(roomId).emit("user disconnected", socket.userId);
  });
});

const PORT = process.env.PORT || 3000;
console.log("port", PORT);
server.listen(PORT);
