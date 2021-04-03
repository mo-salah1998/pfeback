const mongoose = require('mongoose')


const AdvertisementSchema = new mongoose.Schema({
    description: { type: String, required: true },
    link: { type: String },
    image: { type: String }
})

module.exports = mongoose.model('Advertisement', AdvertisementSchema)