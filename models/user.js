'use strict';

const connection = require('../functions/connection');
const Schema = connection.mongoose.Schema;

const userSchema = new Schema({
    regNo : {
        type: String, 
        required: true,
        unique: true
    },
    name  : String,
    email : String,
    hashedPassword : String,
    createdAt : Date,
    chat : [{type : Schema.Types.ObjectId, ref : 'Chat'}]
})

const User = connection.mongoose.model('users', userSchema);
module.exports = User;