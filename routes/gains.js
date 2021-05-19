const express = require('express');
const router = express.Router();

const gainsCtrl = require('../controllers/gains');

router.get('/shopping',gainsCtrl.getShoppingGains);

router.get('/food',gainsCtrl.getFoodGains);

router.get('/service',gainsCtrl.getServiceGains);


module.exports = router;