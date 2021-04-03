const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    content: { type: String },
    code: { type: String },
    seen: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, seenDate: { type: Date } }],
    date: { type: Date }
})

messageSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Message', messageSchema)
