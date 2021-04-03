const mongoose = require('mongoose')


const RegionSchema = new mongoose.Schema({
    regionName: { type: String, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
})


module.exports = mongoose.model('Region', RegionSchema)