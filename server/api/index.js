const router = require('express').Router();

router.use('/users', require('./userRoutes'))
router.use('/events', require('./eventRoutes'))
router.use('/invites', require('./inviteRoutes'))

module.exports = router;