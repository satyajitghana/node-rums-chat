'use strict'

const Chat = require('../models/chat');
const User = require('../models/user');
const userFunctions = require('../functions/users');

const message = (status, message) => {
    return {
        status: status,
        message: message
    }
}

// To get the userIDs from regNos
async function getUserIDs(regNos) {
    var promises = [];
    for (var regNo of regNos) promises.push(userFunctions.getUserMongoose(regNo));
    var users = [];
    var res = await Promise.all(promises).then((res) => {return res;}).catch(console.log);
    for (var i = 0 ; i < res.length ; i++) {
        users.push(res[i]._id);
    }
    return users;
}

// add the created chatID to the given list of userIDs
async function addChatIDs(chatID, userIDs) {
    var promises = [];
    for (var userID of userIDs) {
        var user = await User.findOne({_id: userID});
        user.chat.push(chatID);
        promises.push(user.save());
    }
    var res = await Promise.all(promises);
    return res;
}

// participants are given in regNos, which is an array of strings
// participants = ['17ETCS002159', '17ETCS002178'];
const createChat = (participants) => {
    return new Promise((resolve, reject) => {
        getUserIDs(participants)
            .then( userIDs => {
        //resolve(userIDs);
        /*var newUser = new User({
            regNo : '17ETCS002151'
        })*/
        
        var newMessage = {
            from : 'me',
            to : 'you',
            time : new Date(),
            text : 'Hello World'
        };

        var newChat = new Chat.Chat({
            createdAt : new Date()
        });

        for (var user of userIDs) newChat.participants.push(user);
        newChat.messages.push(newMessage);

        return newChat.save()
        // not sure if i am making a "then" HELL, but oh well it works for now
            //.then(() => {return newMessage.save();})
            /*.then((res) => {resolve(message(201, 'Chat created Successfully !'));})
            .catch((err) => {
                if (err.code == 11000) {
                    reject(message(400, 'Chat Already Exists !'));
                } else {
                    reject(message(500, 'Internal Server Error !'));
                }
            });*/ 
        })
        .then((newChat) => {
            //console.log(newChat);
            return addChatIDs(newChat._id, newChat.participants)
        })
        .then((res) => {resolve(message(201, 'Chat created Successfully !'))})
        .catch((err) => {console.log(err); reject(message(500, 'Internal Server Error'))});
    });
};

module.exports = createChat;