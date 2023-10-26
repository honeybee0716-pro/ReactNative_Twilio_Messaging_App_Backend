const express = require('express');
const location = require('../controllers/location');
const { userVerification } = require('../middlewares/middleware');

const router = express.Router();

/**
 * create location
 */
router.post('/', userVerification, location.create);

/**
 * get all location
 */
router.get('/',  userVerification, location.get);

/**
 * get location by id
 */
router.get('/:id', userVerification, location.getById);

/**
 * edit location
 */
router.put('/:id', userVerification, location.update);

/**
 * remove location
 */
router.delete('/:id', userVerification, location.remove);

module.exports = router;
