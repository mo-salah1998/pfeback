const express = require('express');
const router = express.Router();

const statistiqueCtrl = require('../controllers/statistique');

router.get('/',statistiqueCtrl.statistique);

module.exports = router;