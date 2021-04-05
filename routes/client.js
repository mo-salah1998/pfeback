const express = require('express');
const router = express.Router();

const clientCtrl = require('../controllers/client');
router.get('/',clientCtrl.getall);
router.get('/:id',clientCtrl.getone);

module.exports = router;