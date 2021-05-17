const Order = require('../models/Order');

exports.getall = async (req, res, next) => {
    try {
        const {page = 1, limit = 50} = req.query;
        const total = await Order.countDocuments();
        const endIndex = (total / limit) + 1;

        const orders = await Order.find({}, {
            client: 1, actif: 1, taked: 1, prepared: 1, passed: 1, payed: 1, price: 1, partner: 1, items: 1
        })
            .limit(limit * 1)
            .populate('client partner items.product')
            .skip((page - 1) * limit);
        res.json({
            total,
            recu: orders.length,
            page: parseInt(page),
            endIndex: parseInt(endIndex),
            orders
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};
exports.getaWithStatus = async (req, res, next) => {
    try {
        const {page = 1, limit = 50, status = ""} = req.query;
        const total = await Order.countDocuments();
        const endIndex = (total / limit) + 1;

        let actif = true;
        let payed = false;
        let taked = false;
        let prepared = false;

        if (status === "annuler") {
            actif = false;
        }
        if (status === "livrée") {
            payed = true;
        }
        if (status === "taked") {
            taked = true;
        }
        if (status === "prepared") {
            prepared = true;
        }
        const orders = await Order.find({actif, payed, taked, prepared}, {
            client: 1, actif: 1, taked: 1, prepared: 1, passed: 1, payed: 1, price: 1, partner: 1, items: 1
        })
            .limit(limit * 1)
            .populate('client partner items.product')
            .skip((page - 1) * limit);
        res.json({
            total,
            recu: orders.length,
            page: parseInt(page),
            endIndex: parseInt(endIndex),
            orders
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.preparedToTaked = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id);
        order.taked = true;
        const updatedOrder = await order.save();
        res.status(200).json('update successfully')
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
exports.TakedToLivred = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id);
        order.payed = true;
        const updatedOrder = await order.save();
        res.status(200).json('update successfully')
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
exports.passedToTaked = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id);
        order.prepared = true;
        const updatedOrder = await order.save();
        res.status(200).json('update successfully')
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
exports.Annuler = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id);
        order.actif = false;
        const updatedOrder = await order.save();
        res.status(200).json('update successfully')
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
