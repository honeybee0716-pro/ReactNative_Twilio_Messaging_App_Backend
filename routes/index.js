const express = require('express');
const router = express.Router();
const client = require('./client');
const customer = require('./customer');
const location = require('./location');
const holiday = require('./holiday');
const sms = require('./sms');

router.use('/client', client);
router.use('/customer', customer);
router.use('/location', location);
router.use('/holiday', holiday);
router.use('/sms', sms);

/* GET home page. */
router.get('/', (req, res) => {
  // setInterval(automation, 1000 * 60)
  res.send('Welcome to ReConnectSMS!');
});

module.exports = router;
