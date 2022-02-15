const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    time: { type: Date },
    to: { type: String },
    from: { type: String },
    text: { type: String },
    read: { type: Boolean },
    send: { type: Boolean }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message