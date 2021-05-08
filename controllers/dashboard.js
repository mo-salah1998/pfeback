const Partner = require('../models/Partner');
const Order = require('../models/Order');


exports.dashbord = async (req,res,next) => {

    try {
        const totalPartenaires = await Partner.countDocuments();
        const totalOrders = await Order.countDocuments();
        res.status(200).json({
            nbTelechargement : "3.580",
            nbTelechargementparJour : 100 ,
            totalPartenaires: totalPartenaires,
            totalOrders:totalOrders,
            fbPageLikes:"4324",
            fbPageabonner:"4212",
            instagrameFollowrs:"781",
            instagramePublications:"56",
            emailNonLus:50,
            emailresponce:9,
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}