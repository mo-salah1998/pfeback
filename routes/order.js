const express = require('express');
const router = express.Router();

const ordersCtrl = require('../controllers/orders');

router.get('/',ordersCtrl.getall);

module.exports = router;