const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/events', require('./eventRoutes'));
router.use('/invites', require('./inviteRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/camera', require('./imageRoutes'));

module.exports = router;
