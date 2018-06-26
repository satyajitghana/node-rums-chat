'use strict'

const User = require('../models/user');
require('../models/chat');

async function getUserID(regNo) {
    try {
        var user = await User.findOne({regNo : regNo}).populate('chat');
    } catch(err) { return Promise.reject(err);}
    if (user == null) return Promise.reject({status: 404, message : 'User Not Found'});
    //console.log(user.chat);
    var callerUserID = user._id;
    var listOfUserIDs = [];
    for (var i = 0 ; i < user.chat.length ; i++) {
        var populatedChat = user.chat[i].populate('participants');
        for (let _user of populatedChat.participants) {
            if (_user.toString() != callerUserID.toString())
                listOfUserIDs.push(_user);
        }
    }
    var listWithChatIDs = []
    for (var i = 0; i < listOfUserIDs.length; i++) {
        listWithChatIDs.push({chatID: user.chat[i]._id, userID: listOfUserIDs[i]})
    }
    //console.log(listWithChatIDs);
    //return listOfUserIDs;
    return listWithChatIDs;
}

// I know this is dumb, i'll clean the code later sometime - shadowleaf (satyajit_ghana)
async function getRegNo(listWithChatIDs) {
    var userID = [];
    for (var i = 0 ; i < listWithChatIDs.length ; i++) {
        userID.push(listWithChatIDs[i].userID);
    }
    //console.log(userID);
    var promises = [];
    for (var i = 0 ; i < userID.length ; i++) {
        try {
            promises.push(User.findOne({_id : userID[i]}, {regNo: 1, name: 1,_id : 0}));
        } catch (err) {return Promise.reject(err);}
    }
    var tempUsers = await Promise.all(promises);
    var users = [];
    for (let _user of tempUsers) {
        users.push({regNo: _user.regNo, name: _user.name});
    }
    var listOfChats = [];
    for (var i = 0 ; i < users.length ; i++) {
        listOfChats.push({chatID: listWithChatIDs[i].chatID, regNo: users[i].regNo, name: users[i].name});
    }
    return listOfChats;
}

const getDMs = (regNo) => {
    return new Promise((resolve, reject) => {
        getUserID(regNo)
            .then((users) => {
                return getRegNo(users);
            })
            .then((users) => resolve(users))
            .catch((err) => reject(err));
    });
}

// finish this, basically just return the group name, currently there is no check if the chat is a group or not
// so add the boolean isGroup to the chatID thing, else groups wont work for now.
const getGroupMsgs = (regNo) => {
    return new Promise((resolve, reject) => {

    });
}

module.exports.getDMs = getDMs;