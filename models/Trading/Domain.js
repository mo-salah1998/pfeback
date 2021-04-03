const mongoose = require('mongoose')

const domainSchema = new mongoose.Schema({
    name: {
        fr: { type: String, required: true },
        en: { type: String, required: true }
    },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    type: { type: String, enum: ['shopping', 'food', 'service', 'delivery'] },
    status: { type: Boolean, default: true }
})


module.exports = mongoose.model('Domain', domainSchema)