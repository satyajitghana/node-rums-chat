'use strict'

const createChat = require('./functions/createChat');

createChat(['17ETCS002158','17ETCS002161']).then(console.log).catch(console.log);

//const getChat = require('./functions/getChat');

//getChat.getDMs('17ETCS002159').then(console.log).catch(console.log);