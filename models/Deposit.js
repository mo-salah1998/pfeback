const mongoose = require('mongoose')


const depositSchema = new mongoose.Schema({
    name: { type: String, required: true },
    deliveryOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryOrder' }],
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
    localisation: {
        lng: { type: Number },
        lat: { type: Number }
    },
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

})


module.exports = mongoose.model('Deposit', depositSchema)