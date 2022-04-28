const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//app.use(express.json())

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', ({msg, name}) => {
        io.emit('chat message', {msg, name});
    });
});

server.listen(5000, () => {
    console.log('listening on *:3000');
});
