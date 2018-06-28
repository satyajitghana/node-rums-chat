'use strict'

const Chat = require('../models/chat');

const getChat = (chatId) => {
    return new Promise((resolve, reject) => {
        Chat.findOne({_id: chatId})
            .then((chat) => {
                if (chat == null) reject({status: 404, message : 'Chat not Found'});
                resolve(chat.messages);
            })
            .catch((err) => {
                //console.log(err);
                reject({status: 500, message : 'Internal Server Error'});
            });
    });
}

module.exports.getChat = getChat;