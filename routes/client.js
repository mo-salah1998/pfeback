const express = require('express');
const router = express.Router();
//const advancedResults = require('../middlewares/resultatAvancerUser');
//const Client = require('../models/User');

const clientCtrl = require('../controllers/client');
router.get('/',clientCtrl.getall);
router.get('/:id',clientCtrl.getone);

module.exports = router;