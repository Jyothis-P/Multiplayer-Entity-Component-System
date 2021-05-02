const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const Game = require('./lib/Game');

const PORT = 5000;
const FPS = 60;

let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.set('port', PORT);
app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.render('index');
});
let game = new Game();

io.on('connection', (socket) => {

    socket.on('join', (data) => {
        game.addNewPlayer(socket, data);
    });

    socket.on('input', (data) => {
        console.log(data)
        game.updateUserInput(socket, data);
    })

});

setInterval(() => {
    game.gameLoop();
    game.updateClients();
}, 1000 / FPS);

server.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`);
});