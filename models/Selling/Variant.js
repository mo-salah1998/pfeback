const mongoose = require('mongoose')
const variantSchema = new mongoose.Schema({

    name: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    options: [{
        name: { type: String, required: true },
    }]



})

module.exports = mongoose.model('Variant', variantSchema)