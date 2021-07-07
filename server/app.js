require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/admin/error');

const ADMIN = '/';

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(ADMIN, adminRoutes);
app.use(errorController.get404);

const activeUsers = new Set();
let roomId = '';

io.on('connection', (socket) => {
  socket.on('JOIN_ROOM', (room) => {
    roomId = room;
    socket.join(room);
  });

  socket.on('SEND_MSG', (msg) => {
    io.to(roomId).emit('RECEIVE_MSG', msg);
  });

  socket.on('TYPING', (data) => {
    socket.broadcast.to(roomId).emit('TYPING', data);
  });

  socket.on('disconnect', () => {
    activeUsers.delete(socket.userId);
    io.to(roomId).emit('user disconnected', socket.userId);
  });
});

const PORT = process.env.PORT || 3000;
console.log('Server listing on PORT: ', PORT);
server.listen(PORT);
