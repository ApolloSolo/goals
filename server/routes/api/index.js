const router = require('express').Router();
const goalRoutes = require('./goalRoutes');
const userRoutes = require('./userRoutes');

router.use('/goals', goalRoutes);
router.use('/user', userRoutes);

module.exports = router;