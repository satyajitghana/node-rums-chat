'use strict'

const connection = require('../functions/connection');
const Schema = connection.mongoose.Schema;

const messageSchema = new Schema({
    from : String,
    to : String,
    time : Date,
    text : String
})

const chatSchema = new Schema({
    participants : [{type: Schema.Types.ObjectId, ref: 'users'}],
    // Using a reference model : messages : [{type: Schema.Types.ObjectId, ref: 'Message'}],
    // Now using an Embedded Document
    messages : [messageSchema],
    createdAt : Date
})

const Chat = connection.mongoose.model('Chat', chatSchema);
// Since it's embedded now, no need of this const Message = connection.mongoose.model('Message', messageSchema);

module.exports = Chat;
// Same here, not required, Chat takes care of the messages module.exports.Message = Message;