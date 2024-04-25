const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
const io = require("socket.io");

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
// io.on('connection', (socket) => {
//     console.log(socket.id)
// })