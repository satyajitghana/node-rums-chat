'use strict';

const mongoose = require('mongoose');

const appName = 'node-rums';
const url = 'mongodb://localhost:27017/' + appName;

mongoose.Promise = global.Promise;

const mongoosePromise = mongoose.connect(url);
mongoosePromise
    .then(() => console.log('Sucessfully Connected to ' + url))
    .catch((err) => console.error(err));

module.exports.mongoose = mongoose;