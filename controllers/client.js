//require('dotenv').config();
const User = require('../models/User');
const Order = require('../models/Order');


exports.getall = async (req, res, next) => {
    try {
        // a discuter avec ahmed is partner isVandor ?? et meme sort

        const {page = 1, limit = 300} = req.query;
        const isVendor = false;
        const isPartner = true;
        const total = await User.countDocuments({isPartner, isVendor});
        let endIndex = (total / limit) + 1;
        const users = await User.find({isPartner, isVendor}, {
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            location: 1
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"firstName": -1});
        if (limit > total) {
            endIndex = parseInt(page);
        }
        res.status(200).json({
            total,
            reçu: users.length,
            page: parseInt(page),
            endIndex: parseInt(endIndex),
            users

        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.getone = async (req, res, next) => {
    try {
        const id = req.params.id;
        user = await User.findById(id, {firstName: 1, lastName: 1, email: 1, phone: 1})
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.json(user);

};


//user = await User.findById(req.params.id,(error, data) => {
//    if (error){
//        return res.status(404).json({message: 'Cannot find user'})
//    }else {
//        return res.status(200).json(data);
//
//    }
//});