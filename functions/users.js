'use strict'

const User = require('../models/user');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, {regNo: 1,  name: 1, _id: 0})
            .then(users => resolve(users))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));
    });
}

const getUser = (regNo) => {
    return new Promise((resolve, reject) => {
        User.findOne({regNo : regNo}, {_id:0, name : 1})
            .then(user => resolve(user.name))
            .catch(err => reject({status : 500, message: 'Internal Server Error !'}));
    });
}

// Now why did i make this function, i have no idea - shadowleaf (satyajit_ghana)
const getUserMongoose = (regNo) => {
    return new Promise((resolve, reject) => {
        User.find({regNo: regNo}, {_id: 1})
            .then(user => resolve(user[0]))
            .catch(err => reject(err));
    });
}

module.exports.getUserMongoose = getUserMongoose;

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;