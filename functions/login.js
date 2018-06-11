'use strict';

const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const message = (status, message) => {
    return {
        status: status,
        message: message
    }
}

const loginUser = (regNo, password) => 
	new Promise((resolve,reject) => {

		User.find({regNo: regNo})
		.then(users => {
			if (users.length == 0) {
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				return users[0];
			}
		})
		.then(user => {
			const hashedPassword = user.hashedPassword;
			if (bcrypt.compareSync(password, hashedPassword)) {
				resolve({ status: 200, message: regNo });
			} else {
				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})
		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));
	});

module.exports.loginUser = loginUser;

// async function login(regNo, password) {
//     let findUser = await User.find({
//         regNo: regNo
//     })
//     findUser = findUser[0];
//     if (findUser.length == 0)
//         return Promise.reject(message(404, 'User not Found !'));

//     if (bcrypt.compareSync(password, findUser.hashedPassword)) {
//         return Promise.resolve(message(200, regNo));
//     }
    
//     return Promise.reject(message(401, 'Invalid Credentials'));
// }

// const loginUser = (regNo, password) => {
//     let loginPromise = login(regNo, password);
//     return loginPromise;
// }