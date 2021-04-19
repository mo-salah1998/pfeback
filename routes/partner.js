const express = require('express');
const router = express.Router();

const PartnerCtrl = require('../controllers/partner');
router.get('/',PartnerCtrl.getall);
router.get('/withtype',PartnerCtrl.getallWithType);
router.get('/:id',PartnerCtrl.getone);



module.exports = router;