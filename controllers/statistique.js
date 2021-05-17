const User = require('../models/User');

exports.statistique = async (req, res, next) => {
    const isVendor = false;
    const isPartner = true;
    commandeParMois =[140, 120, 112, 139, 170, 250, 139, 180, 140, 120, 112, 211];
    commandesParCategories= [30, 80, 50]
    const total = await User.countDocuments({isPartner, isVendor});
    res.status(200).json({
        TotalClient : total,
        newClient: 122 ,
        nbProduitVendue : 1238,
        nbProduitMoyPanier: 3.26,
        avgTime : "08 min 43 s",
        rate : 972,
        commandeParMois:commandeParMois,
        commandesParCategories:commandesParCategories

    })
};
