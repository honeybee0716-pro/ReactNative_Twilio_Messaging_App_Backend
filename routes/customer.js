const express = require('express');
const Customer = require('../controllers/customer');
const { userVerification } = require('../middlewares/middleware');

const router = express.Router();

/**
 * create customer
 */
router.post('/', userVerification, Customer.create);

/**
 * get all customer
 */
router.get('/',  userVerification, Customer.get);

/**
 * get customer by id
 */
router.get('/:id', userVerification, Customer.getById);

/**
 * edit customer
 */
router.put('/:id', userVerification, Customer.update);

/**
 * remove customer
 */
router.delete('/:id', userVerification, Customer.remove);

module.exports = router;
