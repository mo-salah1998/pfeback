const express = require('express');
const router = express.Router();

const PartnerCtrl = require('../controllers/partner');
router.get('/',PartnerCtrl.getall);
router.get('/shopping',PartnerCtrl.getallWithType);

module.exports = router;