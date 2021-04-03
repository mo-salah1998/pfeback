const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, min: 0, max: 5 },
    comment: { type: String },
    date: { type: Date },
    deliverer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }
})


module.exports = mongoose.model('Feedback', feedbackSchema)