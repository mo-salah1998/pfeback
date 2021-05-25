
const User = require('../models/User');

exports.getAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        user = await User.findById(id, {firstName: 1, lastName: 1, email: 1, phone: 1,photo:1})
    }catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.status(200).json(user);

}

exports.modifierAdmin = async (req,res, next) => {
    try{
        const id = req.params.id;
        user = await User.findById(id);
        user.firstName=req.body.data.firstName;
        user.lastName=req.body.data.lastName;
        user.email=req.body.data.email;
        user.phone=req.body.data.phone;
        const updateAdmin= await user.save();
        res.status(200).json('update successfully')
    }catch (err) {
        return res.status(500).json({message: err.message})
    }

}
