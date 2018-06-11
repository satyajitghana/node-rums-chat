'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');

const message = (status, message) => {
    return {
        status: status,
        message: message
    }
}

const registerUser = (regNo, name, email, password) => {
    return new Promise((resolve, reject) => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        const newUser = new User({
            regNo: regNo,
            name: name,
            email: email,
            hashedPassword: hashedPassword,
            createdAt: new Date()
        });

        newUser.save()
            .then(() => resolve(message(201, 'User Registered Successfully !')))
            .catch((err) => {
                if (err.code = 11000) {
                    reject(message(400, 'User Already Registered !'));
                } else {
                    reject(message(500, 'Internal Server Error !'));
                }
            });
    });
}

module.exports.registerUser = registerUser;