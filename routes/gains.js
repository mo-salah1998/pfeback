const express = require('express');
const router = express.Router();

const gainsCtrl = require('../controllers/gains');

router.get('/shopping',gainsCtrl.getShoppingGains);

router.get('/food',gainsCtrl.getFoodGains);

router.get('/service',gainsCtrl.getServiceGains);

router.get('/all',gainsCtrl.allGains);


module.exports = router;