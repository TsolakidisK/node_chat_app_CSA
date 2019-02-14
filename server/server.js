const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


/**
 * Erstellt für jeden neuen User einen Socket zur Verbindung zum Server
 */
io.on('connection', (socket) =>{
    console.log('New User connected');

    /**
     * Server-Socket hört auf Join Schlüsselwort.
     * 
     * @param {object} params - Parameter-Kombination aus Name Room
     * @param {function} callback - Callback-Funktion die clientseitig aufgerufen wird
     * 
     * Funktion wartet darauf, dass neue Nutzer dem Chat beitreten.
     * Für den User der Userliste hinzu und gibt Nachrichten an alle aktiven User des Raums heraus.
     * Der User der gejoined ist erhält eine andere Nachricht.
     */
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required!');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));    

        callback();
    });

    /**
     * Server-Socket hört auf createmessage Schlüsselwort.
     * 
     * @param {object} message - Nachrichten-Objekt 
     * @param {function} callback - Callback-Funktion die clientseitig aufgerufen wird
     * 
     * Funktion Frag User ab, von dessen Sockert die Nachricht geschickt wurde.
     * überprüft ob Nachricht, eine "echte" Nachricht ist und schickt die Nachricht an den Raum des Users, mit dem User als Absender
     */
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); 
        }

        callback();
    });
    /**
     * Server-Socket hört auf createlocationmessage Schlüsselwort.
     * 
     * @param {object} message - Long. und Lat. Koordination vom User 
     * 
     * Schickt Google-Maps-Link an den Raum des Users mit dessen Koordinaten
     */
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    /**
     * Server-Socket hört auf disconnect Schlüsselwort.
     * Wenn User disconnectet, entfernt er diesen User aus der Userliste des jeweiligen Raumes und schickt eine Nachricht an den Raum dass diese User den Raum verlassen hat
     */
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
