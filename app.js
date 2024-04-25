const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "public")));


const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

//bind socket to the server
const io = require("socket.io")(server);

io.on('connection', onConnection)

let socketConneced = new Set();
//run this function when the connection is on
function onConnection(socket) {
    console.log(socket.id);
    socketConneced.add(socket.id);
    io.emit('clients-total', socketConneced.size);
    socket.on('disconnect', () => {
        console.log(socket.id);
        socketConneced.delete(socket.id);
        io.emit('clients-total', socketConneced.size);
    })

    socket.on('message', (data) =>{
        socket.broadcast.emit('chat-message', data)
        console.log(data)
    })
}
