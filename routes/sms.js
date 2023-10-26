const express = require('express');
const SMS = require('../controllers/sms');
const { userVerification } = require('../middlewares/middleware');

const router = express.Router();

/**
 * Create / Send SMS
 */
router.get('/automation', userVerification, SMS.create);

/**
 * Get all SMS
 */
router.get('/', userVerification, SMS.get);

/**
 * Get SMS by id
 */
router.get('/:id', userVerification, SMS.getById);


/**
 * Remove SMS
 */
router.delete('/:id', userVerification, SMS.remove);

module.exports = router;
