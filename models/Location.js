const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({

    locationCode: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    }
})



module.exports = mongoose.model('Location', locationSchema)