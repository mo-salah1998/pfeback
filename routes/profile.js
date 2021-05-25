var express = require('express');
var router = express.Router();
var profile = require('../controllers/profile');


router.get('/:id',profile.getAdmin);
router.put('/:id',profile.modifierAdmin);

module.exports = router;