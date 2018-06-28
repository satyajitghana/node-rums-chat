'use strict'

// const createChat = require('./functions/createChat');

// createChat(['17ETCS002158','17ETCS002161']).then(console.log).catch(console.log);

//const getChat = require('./functions/getChat');

//getChat.getDMs('17ETCS002159').then(console.log).catch(console.log);

const getMessages = require('./functions/getMessages');
const sendMessage = require('./functions/sendMessage');

//getMessages.getChat('5b30dec9d20f6d40f08d7b38').then(console.log).catch(console.log);
sendMessage('5b311a523c068c6388a8cf18', 'me', 'you', 'well, well, well, we meet again').then(console.log).catch(console.log);