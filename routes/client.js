const { Signup, Login, getMe } = require('../controllers/client');
const { userVerification } = require('../middlewares/middleware');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get('/me', userVerification, getMe);

module.exports = router;
