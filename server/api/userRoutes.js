const { User } = require('../db/models');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  User.findAll({})
    .then(data => res.send(data))
});

module.exports = router;