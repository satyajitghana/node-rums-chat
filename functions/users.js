'use strict'

const User = require('../models/user');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, {regNo: 1,  name: 1, _id: 0})
            .then(users => resolve(users))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));
    });
}

module.exports.getUsers = getUsers;