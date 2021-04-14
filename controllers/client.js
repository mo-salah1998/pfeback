//require('dotenv').config();
const User = require('../models/User');
const Order = require('../models/Order');


exports.getall = async(req, res, next) => {
    try {
        const {page = 1 , limit = 10} = req.query;
        const users = await User.find({isPartner:true,isVendor:false},{firstName:1,lastName:1,email:1,phone:1,location:1})
            .limit(limit *1).skip((page-1)*limit);
        res.status(200).json({total:users.length,users})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};


exports.getone = async(req, res, next) => {
    try {
        user = await User.findById(req.params.id,{firstName:1,lastName:1,email:1,phone:1,location:1})
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