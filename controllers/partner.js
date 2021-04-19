const Partner = require('../models/Partner');
const Domain = require('../models/Trading/Domain');


exports.getall = async (req, res, next) => {
    try {
        const {page = 1, limit = 50} = req.query;
        const total = await Partner.countDocuments();
        const endIndex = (total / limit) + 1;
        const partners = await Partner.find({}, {
            partnerName: 1,
            rating: 1,
            domain: 1
        })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json({
            total,
            recu: partners.length,
            page: parseInt(page),
            endIndex: parseInt(endIndex),
            partners
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};
exports.getallWithType = async (req, res, next) => {
    try {

        const {page = 1, limit = 10, type = ""} = req.query;
        const domaintype = await Domain.find({type}, {id: 1})
        const total = await Domain.countDocuments({type});
        const endIndex = (total / limit) + 1;

        const partners = await Partner.find({domain: domaintype})
            .select("partnerName rating domain ")
            .populate('domain')
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json({
            total,
            recu: partners.length,
            page: parseInt(page),
            endIndex: parseInt(endIndex), partners
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};


exports.getone = async (req, res, next) => {
    try {
        const id = req.params.id;
        //console.log(id)
        partner = await Partner.findById(id, {})
            .populate('owner')
        if (partner == null) {
            return res.status(404).json({message: 'Cannot find partner'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.json(partner);

};