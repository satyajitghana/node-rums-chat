'use strict'

const Chat = require('../models/chat');

const sendMessage = (chatID, from, to, text) => {
    return new Promise((resolve, reject) => {
        var newMessage = {
            from : from,
            to : to,
            time : new Date(),
            text : text
        };
        Chat.findOne({_id: chatID})
            .then((chat) => {
                chat.messages.push(newMessage);
                return chat.save();
            })
            .then((chat) => resolve({ status: 201, message: 'Message Sent Successfully'}))
            .catch((err) => reject({ status: 500, message : 'Internal Server Error'}));
    });
}

module.exports = sendMessage;