const { User } = require('../db/models');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  User.findAll({}).then(data => res.send(data));
});

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

module.exports = router;
