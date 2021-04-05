require('dotenv').config();
const User = require('../models/User');


exports.getall = async(req, res, next) => {
    try {
        const users = await User.find({isPartner:false,isVendor:false},{firstName:1,lastName:1,email:1,phone:1,location:1});
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};


exports.getone = async(req, res, next) => {
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.json(user);

};


