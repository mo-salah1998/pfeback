const express = require('express');
const router = express.Router();

const ordersCtrl = require('../controllers/orders');

router.get('/',ordersCtrl.getall);
router.get('/type',ordersCtrl.getaWithStatus);
router.patch('/preparedToTaked/:id',ordersCtrl.preparedToTaked);
router.patch('/TakedToLivred/:id',ordersCtrl.TakedToLivred);
router.patch('/preparedToTaked/:id',ordersCtrl.preparedToTaked);
router.patch('/annuler/:id',ordersCtrl.Annuler);//or compleated

module.exports = router;