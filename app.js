'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = express.Router();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(logger('dev'));

const uri = '/api/alpha1'

require('./routes')(router);
app.use(uri, router);

app.listen(port);

console.log(`RUMS Chat server is running on port : ${port} and url : ${uri}`);

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