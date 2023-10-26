const express = require('express');
const holiday = require('../controllers/holiday');
const { userVerification } = require('../middlewares/middleware');

const router = express.Router();

/**
 * create holiday
 */
router.post('/', userVerification, holiday.create);

/**
 * get all holiday
 */
router.get('/',  userVerification, holiday.get);

/**
 * get holiday by id
 */
router.get('/:id', userVerification, holiday.getById);

/**
 * edit holiday
 */
router.put('/:id', userVerification, holiday.update);

/**
 * remove holiday
 */
router.delete('/:id', userVerification, holiday.remove);

module.exports = router;
