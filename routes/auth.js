const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//router.delete('/logout',userCtrl.logout)

module.exports = router;