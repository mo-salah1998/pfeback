const Partner = require('../models/Partner');
const Order = require('../models/Order');


exports.dashbord = async (req,res,next) => {

    try {
        const totalPartenaires = await Partner.countDocuments();
        const totalOrders = await Order.countDocuments();
        res.status(200).json({
            nbTelechargement : 500000,
            nbTelechargementparJour : 7000 ,
            totalPartenaires: totalPartenaires,
            totalOrders:totalOrders,
            fbPageLikes:78000,
            instagrameFollowrs:45000,
            email:50,
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}