const Order = require('../models/Order');

exports.getall = async(req, res, next) => {
    try {
        const orders = await Order.find();
        res.json(orders)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

//exports.getTaked = async(req, res, next) => {
//    try {
//        const orders = await Order.find({});
//        res.json(orders)
//    } catch (err) {
//        res.status(500).json({message: err.message})
//    }
//};
//
//exports.getPrepared = async(req, res, next) => {
//    try {
//        const orders = await Order.find({prepared:true});
//        res.json(orders)
//    } catch (err) {
//        res.status(500).json({message: err.message})
//    }
//};
//
//exports.getPassed = async(req, res, next) => {
//    try {
//        const orders = await Order.find({passed:true});
//        res.json(orders)
//    } catch (err) {
//        res.status(500).json({message: err.message})
//    }
//};