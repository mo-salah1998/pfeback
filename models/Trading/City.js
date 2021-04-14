const mongoose = require('mongoose')


const citySchema = new mongoose.Schema({
    cityName: { type: String, required: true },
    regions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }]
})


module.exports = mongoose.model('City', citySchema)

