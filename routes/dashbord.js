const express = require('express');
const router = express.Router();
const dashboardctrl = require('../controllers/dashboard');

router.get('/',dashboardctrl.dashbord );

module.exports = router;