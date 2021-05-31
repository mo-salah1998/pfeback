const Partner = require('../models/Partner');
const Domain = require('../models/Trading/Domain');

const Order = require('../models/Order')
exports.getShoppingGains = async (req, res, next) => {
    try {
        const {page = 1, limit = 100, type = "shopping"} = req.query;
        const domaintype = await Domain.find({type}, {id: 1})
        const total = await Domain.countDocuments({type});
        const endIndex = (total / limit) + 1;

        const partners = await Partner.find({domain: domaintype})
            .select("partnerName")
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({
            partners:partners
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.getFoodGains = async (req, res, next) => {
    try {




        const {page = 1, limit = 100, type = "food"} = req.query;
        const domaintype = await Domain.find({type}, {id: 1})
        const total = await Domain.countDocuments({type});
        const endIndex = (total / limit) + 1;

        const partners = await Partner.find({domain: domaintype})
            .select("partnerName ")
            .populate('owner domain owner')
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({
            partners:partners
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


exports.getServiceGains = async (req, res, next) => {
    try {

        const {page = 1, limit = 100, type = "service"} = req.query;
        const domaintype = await Domain.find({type}, {id: 1})
        const total = await Domain.countDocuments({type});
        const endIndex = (total / limit) + 1;

        const partners = await Partner.find({domain: domaintype})
            .select("partnerName ")
            .populate('owner domain owner')
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({
            partners:partners
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }

}
exports.allGains = async (req, res, next) => {
    try {

        let orders = await Order.find({},{_id: 0,partner:1})
        let table =[];
        for (let i = 0; i < orders.length; i++) {
            if (table.indexOf(orders[i].partner)===-1){
                table[i]= orders[i].partner;
            }
        }

        res.status(200).json({
            orders:orders,
            table
        })

    }catch (err) {
        res.status(500).json({message: err.message})
    }
}