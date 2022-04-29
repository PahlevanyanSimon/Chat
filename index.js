const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 5000

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', ({ msg, name }) => {
        io.emit('chat message', { msg, name });
    });
});

server.listen(process.env.PORT, () => {
    console.log('listening on *:3000');
});
