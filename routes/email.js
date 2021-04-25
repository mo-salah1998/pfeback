const express = require('express');
const router = express.Router();
const emailCtrl = require('../controllers/email');

router.post('/', emailCtrl.sendmail);
router.get('/inbox', emailCtrl.inbox);
/*
router.post('/',(req, res) => {
    const { subject, email, text } = req.body;

    emailCtrl(email, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.status(500).json({ message: 'Email sent!!!!!' });
    });
});
module.exports = router;
/*
emailCtrl.sendmail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
*/
module.exports = router;