const Partner = require('../models/Partner');
const Domain = require('../models/Trading/Domain');


exports.getall = async(req, res, next) => {
    try {
        const {page = 1 , limit = 50} = req.query;
        const partners = await Partner.find({},{partnerName:1,rating:1,domain:1})
            .limit(limit *1).skip((page-1)*limit);
        res.status(200).json({total:partners.length,partners})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};
exports.getallWithType = async(req, res, next) => {
    try {
        const {page = 1 , limit = 10,type=""} = req.query;
        const food = await Domain.find({type},{id:1})


        const partners = await Partner.find({domain:food})
            .select("partnerName rating domain ")
            .populate('domain')
            .limit(limit *1).skip((page-1)*limit);

       //for (let partner in partners){
       //    const val = await Domain.findById(partner.domain,{type:"food"})
       //    console.log(val);
       //}
        //const domain = await Domain.find()

        res.status(200).json({total:partners.length,partners})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};
