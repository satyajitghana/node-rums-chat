'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = express.Router();
const port = process.env.PORT || 8080;
const socket = require('socket.io');

app.use(bodyParser.json());
app.use(logger('dev'));

const uri = '/api/alpha1'

// just a short hand to call the function router, with parameeters router
require('./routes')(router);
app.use(uri, router);

const server = app.listen(port, () => console.log('The Server is now Listening !'));

console.info(`RUMS Chat server is running on port : ${port} and url : ${uri}`);


const socketApp = express();
const socketAppServer = socketApp.listen(1999, () => console.log('Socket App running on Port : 1999')); 
const io = socket(socketAppServer);

// Use a different file for all of these socket.on methods - shadowleaf (satyajit_ghana)
io.on('connection', (socket) => {
    console.info('new Socket connection made !');
    socket.on('join', (data) => {
        socket.join(data.chatID);
        //console.log(data.chatID);
        //var _message = {from: 'someone', to: 'someone', time: 'now', text: 'Hey Im the Developer'};
        //io.sockets.in('5b311a523c068c6388a8cf18').emit('new_message', _message);
    });

    socket.on('new_message', (data) => {
        io.sockets.in(data.chatID).emit('new_message', data.message);
    });
});


// const getUsers = require("./functions/users");

// getUsers.getUsers();

// const register = require('./functions/register');
// const login = require('./functions/login');

// let message = register.registerUser('17ETCS002158', 'yo', 'yo@yo.com', 'satyajit');
// message
//     .then(console.log)
//     .catch(console.log);

// let message1 = login.loginUser('17ETCS002159', 'satyajit123')
//     .then(console.log)
//     .catch(console.log);